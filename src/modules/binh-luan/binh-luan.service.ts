import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { successResponse } from '../../common/utils/response.util';
import { CreateBinhLuanDto } from './dtos/create-binh-luan.dto';
import { UpdateBinhLuanDto } from './dtos/update-binh-luan.dto';

@Injectable()
export class BinhLuanService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const binhLuanAll = await this.prisma.binhLuan.findMany({
      select: {
        id: true,
        ma_cong_viec: true,
        ma_nguoi_binh_luan: true,
        ngay_binh_luan: true,
        noi_dung: true,
        sao_binh_luan: true,
      },
    });

    return successResponse(
      binhLuanAll.map(this.transformApiBinhLuanRes.bind(this)),
      'Lấy danh sách bình luận thành công',
    );
  }

  async create(dto: CreateBinhLuanDto) {
    const newBinhLuan = await this.prisma.binhLuan.create({
      data: {
        ma_cong_viec: dto.maCongViec,
        ma_nguoi_binh_luan: dto.maNguoiBinhLuan,
        noi_dung: dto.noiDung,
        sao_binh_luan: dto.saoBinhLuan,
        ngay_binh_luan: dto.ngayBinhLuan,
      },
    });

    return successResponse(newBinhLuan, 'Tạo bình luận công việc thành công');
  }

  async update(id: string, dto: UpdateBinhLuanDto) {
    const isExist = await this.prisma.binhLuan.findUnique({
      where: { id: Number(id) },
    });

    if (!isExist) {
      throw new NotFoundException(`Không tìm thấy bình luận với id = ${id}`);
    }

    const updateData: Record<string, any> = {};

    if (dto.noiDung !== undefined) {
      updateData.noi_dung = dto.noiDung;
    }

    const binhLuanUpdated = await this.prisma.binhLuan.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return successResponse(binhLuanUpdated, 'Cập nhật bình luận thành công');
  }

  async getBinhLuanCongViec(maCongViec: string) {
    const getBinhLuan = await this.prisma.binhLuan.findMany({
      where: { ma_cong_viec: Number(maCongViec) },
      orderBy: { id: 'asc' },
      select: {
        id: true,
        ma_cong_viec: true,
        ma_nguoi_binh_luan: true,
        ngay_binh_luan: true,
        noi_dung: true,
        sao_binh_luan: true,
      },
    });

    return successResponse(
      getBinhLuan.map(this.transformApiBinhLuanRes.bind(this)),
      'Lấy danh sách bình luận công việc theo maCongViec thành công',
    );
  }

  async deleteBinhLuan(id: string) {
    const isExist = await this.prisma.binhLuan.findUnique({
      where: { id: Number(id) },
    });

    if (!isExist) {
      throw new NotFoundException(`Không tìm thấy bình luận với id = ${id}`);
    }

    const binhLuanDeleted = await this.prisma.binhLuan.delete({
      where: { id: Number(id) },
    });

    return successResponse(binhLuanDeleted, 'Xoá bình luận thành công');
  }

  private transformApiBinhLuanRes(binhLuan: {
    id: number;
    ma_cong_viec: number;
    ma_nguoi_binh_luan: number;
    ngay_binh_luan: string;
    noi_dung: string;
    sao_binh_luan: number;
  }) {
    return {
      id: binhLuan.id,
      maCongViec: binhLuan.ma_cong_viec,
      maNguoiBinhLuan: binhLuan.ma_nguoi_binh_luan,
      ngayBinhLuan: this.formatDateUTC(binhLuan.ngay_binh_luan),
      noiDung: binhLuan.noi_dung,
      saoBinhLuan: binhLuan.sao_binh_luan,
    };
  }

  private formatDateUTC(dateString: string) {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }
}
