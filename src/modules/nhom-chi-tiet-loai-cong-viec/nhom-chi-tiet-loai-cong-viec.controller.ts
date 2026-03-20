import { Body, Controller, Post } from '@nestjs/common';
import { CreateNhomChiTietLoaiCongViecDto } from './dtos/create-nhom-chi-tiet-loai-cong-viec.dto';
import { NhomChiTietLoaiCongViecService } from './nhom-chi-tiet-loai-cong-viec.service';

@Controller('api/nhom-chi-tiet-loai-cong-viec')
export class NhomChiTietLoaiCongViecController {
  constructor(
    private readonly nhomChiTietLoaiCongViecService: NhomChiTietLoaiCongViecService,
  ) {}

  @Post()
  create(@Body() dto: CreateNhomChiTietLoaiCongViecDto) {
    return this.nhomChiTietLoaiCongViecService.create(dto);
  }
}
