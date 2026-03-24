import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateCongViecDto } from './dtos/create-cong-viec.dto';

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

    return {
      statusCode: 201,
      message: 'Tạo công việc thành công',
      data: newCongViec,
    };
  }
}
