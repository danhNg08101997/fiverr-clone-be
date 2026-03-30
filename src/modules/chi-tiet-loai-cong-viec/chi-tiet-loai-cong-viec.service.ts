import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateChiTietLoaiCongViecDto } from './dtos/create-chi-tiet-loai-cong-viec.dto';
import { successResponse } from '../../common/utils/response.util';

@Injectable()
export class ChiTietLoaiCongViecService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateChiTietLoaiCongViecDto) {
    const isDuplicate = await this.prisma.chiTietLoaiCongViec.findFirst({
      where: {
        ten_chi_tiet: dto.tenChiTiet,
      },
    });

    if (isDuplicate) {
      throw new BadRequestException(
        `tenChiTiet=${dto.tenChiTiet} bị trùng`,
        HttpStatus.BAD_REQUEST.toString(),
      );
    }

    const newChiTietLoaiCongViec = await this.prisma.chiTietLoaiCongViec.create(
      {
        data: {
          ten_chi_tiet: dto.tenChiTiet,
          ma_nhom_chi_tiet_loai_cong_viec: dto.maNhomChiTietLoaiCongViec || 1,
        },
      },
    );

    return successResponse(
      newChiTietLoaiCongViec,
      'Tạo chi tiết loại công việc thành công',
    );
  }
}
