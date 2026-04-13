import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNhomChiTietLoaiCongViecDto } from './dtos/create-nhom-chi-tiet-loai-cong-viec.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { QueryLoaiCongViecDto } from '../../common/dtos/query-loai-cong-viec.dto';
import { UpdateNhomChiTietLoaiCongViecDto } from './dtos/update-nhom-chi-tiet-loai-cong-viec.dto';
import {
  paginationResponse,
  successResponse,
} from '../../common/utils/response.util';

@Injectable()
export class NhomChiTietLoaiCongViecService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateNhomChiTietLoaiCongViecDto) {
    const isDuplicate = await this.prisma.nhomChiTietLoaiCongViec.findFirst({
      where: {
        ten_nhom: dto.tenNhom,
      },
    });

    if (isDuplicate) {
      throw new BadRequestException(
        `tenNhom = ${dto.tenNhom} bị trùng`,
        HttpStatus.BAD_REQUEST.toString(),
      );
    }

    const newNhomChiTietLoaiCongViec =
      await this.prisma.nhomChiTietLoaiCongViec.create({
        data: {
          ten_nhom: dto.tenNhom ?? '',
          hinh_anh: dto.hinhAnh ?? '',
          ma_loai_cong_viec: dto.maLoaiCongViec,
        },
      });

    return successResponse(
      newNhomChiTietLoaiCongViec,
      'Tạo nhóm chi tiết loại công việc thành công',
    );
  }

  async findAll() {
    const nhomChiTietLoaiCongViecAll =
      await this.prisma.nhomChiTietLoaiCongViec.findMany({
        include: { ChiTietLoaiCongViecs: true },
      });

    return successResponse(
      nhomChiTietLoaiCongViecAll.map(
        this.transformNhomLoaiCongViecTheoChiTietLoaiRes.bind(this),
      ),
      'Lấy danh sách nhóm chi tiết loại công việc thành công',
    );
  }

  async findAllPaginationAndSearch(query: QueryLoaiCongViecDto) {
    const pageIndex = Number(query.pageIndex) || 1;
    const pageSize = Number(query.pageSize) || 10;
    const keyword = query.keyword?.trim() || '';

    if (pageIndex < 1 && pageSize < 1) {
      throw new BadRequestException(
        'pageIndex và pageSize phải lớn hơn 1',
        HttpStatus.BAD_REQUEST.toString(),
      );
    }

    const whereCondition = keyword
      ? {
          ten_nhom: { contains: keyword },
        }
      : {};

    const [data, totalRow] = await Promise.all([
      this.prisma.nhomChiTietLoaiCongViec.findMany({
        where: whereCondition,
        skip: (pageIndex - 1) * pageSize,
        take: pageSize,
        orderBy: {
          id: 'asc',
        },
      }),

      this.prisma.nhomChiTietLoaiCongViec.count({
        where: whereCondition,
      }),
    ]);

    return paginationResponse(
      data.map(this.transformNhomLoaiCongViecRes.bind(this)),
      {
        pageIndex,
        pageSize,
        totalItems: totalRow,
        totalPages: Math.ceil(totalRow / pageSize),
        keyword,
      },
      'Lấy danh sách nhóm chi tiết loại công việc phân trang, tìm kiếm thành công',
    );
  }

  async findOne(id: string) {
    if (Number(id) < 1) {
      throw new BadRequestException(
        'id phải lớn hơn 1',
        HttpStatus.BAD_REQUEST.toString(),
      );
    }

    const nhomChiTietLoaiCongViecTheoId =
      await this.prisma.nhomChiTietLoaiCongViec.findUnique({
        where: { id: Number(id) },
        select: {
          id: true,
          ten_nhom: true,
          hinh_anh: true,
          ma_loai_cong_viec: true,
          ChiTietLoaiCongViecs: {
            select: {
              id: true,
              ten_chi_tiet: true,
            },
          },
        },
      });

    if (!nhomChiTietLoaiCongViecTheoId) return;

    const result = {
      ...nhomChiTietLoaiCongViecTheoId,
      hinh_anh: nhomChiTietLoaiCongViecTheoId.hinh_anh ?? '',
    };

    return successResponse(
      this.transformNhomLoaiCongViecTheoChiTietLoaiRes(result),
      'Lấy nhóm loại chi tiết công việc theo Id thành công',
    );
  }

  async update(id: string, data: UpdateNhomChiTietLoaiCongViecDto) {
    const isExist = await this.prisma.nhomChiTietLoaiCongViec.findUnique({
      where: { id: Number(id) },
    });

    if (!isExist) {
      throw new NotFoundException(
        `Không tìm thấy nhóm chi tiết loại công việc với id = ${id}`,
      );
    }

    const updateData: Record<string, any> = {};

    if (data.tenNhom !== undefined) {
      updateData.ten_nhom = data.tenNhom;
    }

    if (Object.keys(updateData).length === 0) {
      throw new BadRequestException('Không có dữ liệu hợp lệ để cập nhật');
    }

    const nhomChiTietLoaiCongViecUpdated =
      await this.prisma.nhomChiTietLoaiCongViec.update({
        where: {
          id: Number(id),
        },
        data: updateData,
      });

    return successResponse(
      nhomChiTietLoaiCongViecUpdated,
      'Cập nhật nhóm chi tiết loại công việc thành công',
    );
  }

  async delete(id: string) {
    const isExist = await this.prisma.nhomChiTietLoaiCongViec.findUnique({
      where: { id: Number(id) },
    });
    if (!isExist) {
      throw new NotFoundException(
        `Không tìm thấy nhóm chi tiết loại công việc với id = ${id}`,
      );
    }

    const nhomChiTietLoaiCongViecDeleted =
      await this.prisma.nhomChiTietLoaiCongViec.delete({
        where: { id: Number(id) },
      });

    return successResponse(
      nhomChiTietLoaiCongViecDeleted,
      'Xóa nhóm chi tiết loại công việc theo Id thành công',
    );
  }

  private transformNhomLoaiCongViecTheoChiTietLoaiRes(nhomLoaiCongViec: {
    id: number;
    ten_nhom: string;
    hinh_anh: string;
    ma_loai_cong_viec: number;
    ChiTietLoaiCongViecs: {
      id: number;
      ten_chi_tiet: string;
    }[];
  }) {
    return {
      id: nhomLoaiCongViec.id,
      tenNhom: nhomLoaiCongViec.ten_nhom,
      hinhAnh: nhomLoaiCongViec.hinh_anh,
      maLoaiCongViec: nhomLoaiCongViec.ma_loai_cong_viec,
      dsChiTietLoaiCongViec: nhomLoaiCongViec.ChiTietLoaiCongViecs.map(
        (chiTietLoaiCongViec) => ({
          id: chiTietLoaiCongViec.id,
          tenChiTiet: chiTietLoaiCongViec.ten_chi_tiet,
        }),
      ),
    };
  }

  private transformNhomLoaiCongViecRes(nhomLoaiCongViec: {
    id: number;
    ten_nhom: string;
    hinh_anh: string;
    ma_loai_cong_viec: number;
  }) {
    return {
      id: nhomLoaiCongViec.id,
      tenNhom: nhomLoaiCongViec.ten_nhom,
      hinhAnh: nhomLoaiCongViec.hinh_anh,
      maLoaicongViec: nhomLoaiCongViec.ma_loai_cong_viec,
    };
  }
}
