import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateLoaiCongViecDto } from './dtos/create-loai-cong-viec.dto';

@Injectable()
export class LoaiCongViecService {
  constructor(private readonly prisma: PrismaService) {}

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
      data: newLoaiCongViec,
    };
  }

  async findAll() {
    const loaiCongViecAll = await this.prisma.loaiCongViec.findMany({
      include: {
        NhomChiTietLoaiCongViec: true,
      },
    });

    return loaiCongViecAll;
  }
}
