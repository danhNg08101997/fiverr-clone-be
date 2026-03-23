import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateNhomChiTietLoaiCongViecDto } from './dtos/create-nhom-chi-tiet-loai-cong-viec.dto';
import { NhomChiTietLoaiCongViecService } from './nhom-chi-tiet-loai-cong-viec.service';

@Controller('api/nhom-chi-tiet-loai-cong-viec')
export class NhomChiTietLoaiCongViecController {
  constructor(
    private readonly nhomChiTietLoaiCongViecService: NhomChiTietLoaiCongViecService,
  ) {}

  // POST api/nhom-chi-tiet-loai-cong-viec
  @Post()
  create(@Body() dto: CreateNhomChiTietLoaiCongViecDto) {
    return this.nhomChiTietLoaiCongViecService.create(dto);
  }

  // GET api/nhom-chi-tiet-loai-cong-viec
  @Get()
  findAll() {
    return this.nhomChiTietLoaiCongViecService.findAll();
  }
}
