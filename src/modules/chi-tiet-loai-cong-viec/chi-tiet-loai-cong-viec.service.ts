import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateChiTietLoaiCongViecDto } from './dtos/create-chi-tiet-loai-cong-viec.dto';
import { successResponse } from '../../common/utils/response.util';
import { UpdateChiTietLoaiCongViecDto } from './dtos/update-chi-tiet-loai-cong-viec.dto';

@Injectable()
export class ChiTietLoaiCongViecService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateChiTietLoaiCongViecDto) {
    const isDuplicate = await this.prisma.chiTietLoaiCongViec.findFirst({
      where: {
        ten_chi_tiet: dto.tenChiTiet ?? '',
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

  async update(id: string, dto: UpdateChiTietLoaiCongViecDto) {
    const isExisted = await this.prisma.chiTietLoaiCongViec.findUnique({
      where: { id: Number(id) },
    });

    if (!isExisted) {
      throw new BadRequestException(
        `Không tìm thấy chi tiết loại công việc với id = ${id}`,
      );
    }

    const updateData: Record<string, any> = {};

    if (dto.tenChiTiet !== undefined) {
      updateData.ten_chi_tiet = dto.tenChiTiet;
    }

    if (dto.maNhomChiTietLoaiCongViec !== undefined) {
      updateData.ma_nhom_chi_tiet_loai_cong_viec =
        dto.maNhomChiTietLoaiCongViec;
    }

    if (Object.keys(updateData).length === 0) {
      throw new BadRequestException('Không có dữ liệu hợp lệ để cập nhật');
    }

    const chiTietLoaiCongViecUpdated =
      await this.prisma.chiTietLoaiCongViec.update({
        where: { id: Number(id) },
        data: updateData,
      });

    return successResponse(
      chiTietLoaiCongViecUpdated,
      'Cập nhật chi tiết loại công việc thành công',
    );
  }
}
