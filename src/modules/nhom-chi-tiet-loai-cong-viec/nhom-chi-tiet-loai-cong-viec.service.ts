import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNhomChiTietLoaiCongViecDto } from './dtos/create-nhom-chi-tiet-loai-cong-viec.dto';
import { PrismaService } from '../../../prisma/prisma.service';

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
          ten_nhom: dto.tenNhom,
          hinh_anh: dto.hinhAnh,
          ma_loai_cong_viec: dto.maLoaiCongViec,
        },
      });

    return {
      statusCode: 201,
      message: 'Tạo nhóm chi tiết loại công việc thành công',
      data: newNhomChiTietLoaiCongViec,
    };
  }

  async findAll() {
    const nhomChiTietLoaiCongViecAll =
      await this.prisma.nhomChiTietLoaiCongViec.findMany({
        include: { ChiTietLoaiCongViec: true },
      });

    return {
      statusCode: 200,
      content: nhomChiTietLoaiCongViecAll,
    };
  }
}
