import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateLoaiCongViecDto } from './dtos/create-loai-cong-viec.dto';

@Injectable()
export class LoaiCongViecService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateLoaiCongViecDto) {
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
}
