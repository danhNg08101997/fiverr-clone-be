import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateNhomChiTietLoaiCongViecDto } from './dtos/create-nhom-chi-tiet-loai-cong-viec.dto';
import { NhomChiTietLoaiCongViecService } from './nhom-chi-tiet-loai-cong-viec.service';
import { QueryLoaiCongViecDto } from '../loai-cong-viec/dtos/query-loai-cong-viec.dto';

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

  // GET api/nhom-chi-tiet-loai-cong-viec/phan-trang-tim-kiem?pageIndex=1&pageSize=10&keyword=abc
  @Get('phan-trang-tim-kiem')
  findAllPaginationAndSearch(@Query() query: QueryLoaiCongViecDto) {
    return this.nhomChiTietLoaiCongViecService.findAllPaginationAndSearch(
      query,
    );
  }
}
