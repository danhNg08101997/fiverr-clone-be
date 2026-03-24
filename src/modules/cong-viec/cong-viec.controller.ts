import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CongViecService } from './cong-viec.service';
import { CreateCongViecDto } from './dtos/create-cong-viec.dto';
import { QueryLoaiCongViecDto } from '../loai-cong-viec/dtos/query-loai-cong-viec.dto';

@Controller('api/cong-viec')
export class CongViecController {
  constructor(private readonly congViecService: CongViecService) {}

  // POST api/cong-viec
  @Post()
  create(@Body() dto: CreateCongViecDto) {
    return this.congViecService.create(dto);
  }

  // GET api/cong-viec
  @Get()
  findAll() {
    return this.congViecService.findAll();
  }

  // GET api/cong-viec/{id}
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.congViecService.findOne(id);
  }

  // GET api/cong-viec/phan-trang-tim-kiem
  @Get('phan-trang-tim-kiem')
  findAllPaginationAndSearch(@Query() query: QueryLoaiCongViecDto) {
    return this.congViecService.findAllPaginationAndSearch(query);
  }
}
