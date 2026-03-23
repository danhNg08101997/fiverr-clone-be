import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { LoaiCongViecService } from './loai-cong-viec.service';
import { CreateLoaiCongViecDto } from './dtos/create-loai-cong-viec.dto';
import { QueryLoaiCongViecDto } from './dtos/query-loai-cong-viec.dto';

@Controller('api/loai-cong-viec')
export class LoaiCongViecController {
  constructor(private readonly loaiCongViecService: LoaiCongViecService) {}

  // POST "/api/loai-cong-viec"
  @Post()
  create(@Body() dto: CreateLoaiCongViecDto) {
    return this.loaiCongViecService.create(dto);
  }

  // GET "/api/loai-cong-viec"
  @Get()
  findAll() {
    return this.loaiCongViecService.findAll();
  }

  // GET "/api/loai-cong-viec/phan-trang-tim-kiem?pageIndex=1&pageSize=10&keyword=abc"
  @Get('phan-trang-tim-kiem')
  findAllPaginationAndSearch(@Query() query: QueryLoaiCongViecDto) {
    return this.loaiCongViecService.findAllPaginationAndSearch(query);
  }

  // GET "/api/loai-cong-viec/{id}
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loaiCongViecService.findOne(id);
  }
}
