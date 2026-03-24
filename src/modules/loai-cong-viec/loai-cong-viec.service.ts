import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateLoaiCongViecDto } from './dtos/create-loai-cong-viec.dto';
import { QueryLoaiCongViecDto } from './dtos/query-loai-cong-viec.dto';
import { UpdateLoaiCongViecDto } from './dtos/update-loai-cong-viec.dto';

@Injectable()
export class LoaiCongViecService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const loaiCongViecAll = await this.prisma.loaiCongViec.findMany();

    return {
      statusCode: 200,
      content: loaiCongViecAll,
    };
  }

  async create(dto: CreateLoaiCongViecDto) {
    const isDuplicate = await this.prisma.loaiCongViec.findFirst({
      where: { ten_loai_cong_viec: dto.tenLoaiCongViec },
    });

    if (isDuplicate) {
      throw new BadRequestException(
        `tenLoaiCongViec = ${dto.tenLoaiCongViec} bị trùng`,
        HttpStatus.BAD_REQUEST.toString(),
      );
    }

    const newLoaiCongViec = await this.prisma.loaiCongViec.create({
      data: {
        ten_loai_cong_viec: dto.tenLoaiCongViec,
      },
    });

    return {
      statusCode: 201,
      message: 'Tạo loại công việc thành công',
      content: newLoaiCongViec,
    };
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
          ten_loai_cong_viec: { contains: keyword },
        }
      : {};

    const [data, totalRow] = await Promise.all([
      this.prisma.loaiCongViec.findMany({
        where: whereCondition,
        skip: (pageIndex - 1) * pageSize,
        take: pageSize,
        orderBy: {
          id: 'asc',
        },
      }),

      this.prisma.loaiCongViec.count({
        where: whereCondition,
      }),
    ]);

    return {
      statusCode: 200,
      message: 'Lấy danh sách loại công việc phân trang, tìm kiếm thành công',
      content: {
        pageIndex,
        pageSize,
        keyword,
        totalRow,
        totalPage: Math.ceil(totalRow / pageSize),
        data,
      },
    };
  }

  async findOne(id: string) {
    if (Number(id) < 1) {
      throw new BadRequestException(
        'id phải lớn hơn 1',
        HttpStatus.BAD_REQUEST.toString(),
      );
    }

    const loaiCongViecTheoId = await this.prisma.loaiCongViec.findUnique({
      where: { id: Number(id) },
      include: { NhomChiTietLoaiCongViec: true },
    });

    return {
      statusCode: 200,
      content: loaiCongViecTheoId,
    };
  }

  async update(id: string, data: UpdateLoaiCongViecDto) {
    const isExist = await this.prisma.loaiCongViec.findUnique({
      where: { id: Number(id) },
    });

    if (!isExist) {
      throw new NotFoundException(
        `Không tìm thấy loại công việc với id = ${id}`,
      );
    }

    const updateData: Record<string, any> = {};

    if (data.tenLoaiCongViec !== undefined) {
      updateData.ten_loai_cong_viec = data.tenLoaiCongViec;
    }

    if (Object.keys(updateData).length === 0) {
      throw new BadRequestException('Không có dữ liệu hợp lệ để cập nhật');
    }

    const loaiCongViecUpdated = await this.prisma.loaiCongViec.update({
      where: {
        id: Number(id),
      },
      data: updateData,
    });

    return {
      statusCode: 200,
      message: 'Cập nhật loại công việc thành công',
      content: loaiCongViecUpdated,
    };
  }
}
