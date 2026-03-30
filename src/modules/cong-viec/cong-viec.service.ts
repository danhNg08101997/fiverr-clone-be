import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateCongViecDto } from './dtos/create-cong-viec.dto';
import { QueryLoaiCongViecDto } from '../../common/dtos/query-loai-cong-viec.dto';
import {
  paginationResponse,
  successResponse,
} from '../../common/utils/response.util';

@Injectable()
export class CongViecService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCongViecDto) {
    const chiTietLoai = await this.prisma.chiTietLoaiCongViec.findUnique({
      where: {
        id: dto.maChiTietLoai,
      },
    });

    if (!chiTietLoai) {
      throw new BadRequestException(
        `maChiTietLoai = ${dto.maChiTietLoai} không tồn tại`,
      );
    }

    const newCongViec = await this.prisma.congViec.create({
      data: {
        ten_cong_viec: dto.tenCongViec,
        danh_gia: dto.danhGia ?? 0,
        gia_tien: dto.giaTien ?? 0,
        hinh_anh: dto.hinhAnh ?? '',
        mo_ta: dto.moTa ?? '',
        mo_ta_ngan: dto.moTaNgan ?? '',
        sao_cong_viec: dto.saoCongViec ?? 0,
        ma_chi_tiet_loai: dto.maChiTietLoai,
        nguoi_tao: dto.nguoiTao ?? '',
      },
    });

    return successResponse(newCongViec, 'Tạo mới công việc thành công');
  }

  async findAll() {
    const congViecAll = await this.prisma.congViec.findMany();

    return successResponse(congViecAll, 'Lấy danh sách công việc thành công');
  }

  async findOne(id: string) {
    if (Number(id) < 1) {
      throw new BadRequestException(
        'id phải lớn hơn 1',
        HttpStatus.BAD_REQUEST.toString(),
      );
    }

    const congViecTheoId = await this.prisma.congViec.findUnique({
      where: { id: Number(id) },
    });

    return successResponse(congViecTheoId, 'Lấy công việc theo Id thành công');
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
          ten_cong_viec: { contains: keyword },
        }
      : {};

    const [data, totalRow] = await Promise.all([
      this.prisma.congViec.findMany({
        where: whereCondition,
        skip: (pageIndex - 1) * pageSize,
        take: pageSize,
        orderBy: {
          id: 'asc',
        },
      }),

      this.prisma.congViec.count({
        where: whereCondition,
      }),
    ]);

    return paginationResponse(
      data,
      {
        pageIndex,
        pageSize,
        totalPages: Math.ceil(totalRow / pageSize),
        totalItems: totalRow,
        keyword,
      },
      'Lấy danh công việc phân trang, tìm kiếm thành công',
    );
  }

  async getMenuLoaiCongViec() {
    const menuLoaiCongViec = await this.prisma.loaiCongViec.findMany({
      orderBy: { id: 'asc' },
      select: {
        id: true,
        ten_loai_cong_viec: true,
        NhomChiTietLoaiCongViecs: {
          orderBy: { id: 'asc' },
          select: {
            id: true,
            ten_nhom: true,
            hinh_anh: true,
            ChiTietLoaiCongViecs: {
              orderBy: { id: 'asc' },
              select: {
                id: true,
                ten_chi_tiet: true,
              },
            },
          },
        },
      },
    });

    return successResponse(
      menuLoaiCongViec.map(this.transformMenuLoaiCongViec.bind(this)),
      'Lấy menu công việc thành công',
    );
  }

  private transformMenuLoaiCongViec(loaiCongViec: {
    id: number;
    ten_loai_cong_viec: string;
    NhomChiTietLoaiCongViecs: {
      id: number;
      ten_nhom: string;
      hinh_anh: string | null;
      ChiTietLoaiCongViecs: {
        id: number;
        ten_chi_tiet: string;
      }[];
    }[];
  }) {
    return {
      id: loaiCongViec.id,
      tenLoaiCongViec: loaiCongViec.ten_loai_cong_viec,
      dsNhomChiTietLoai: loaiCongViec.NhomChiTietLoaiCongViecs.map((nhom) => ({
        id: nhom.id,
        tenNhom: nhom.ten_nhom,
        hinhAnh: nhom.hinh_anh,
        dsChiTietLoai: nhom.ChiTietLoaiCongViecs.map((chiTiet) => ({
          id: chiTiet.id,
          tenChiTiet: chiTiet.ten_chi_tiet,
        })),
      })),
    };
  }
}
