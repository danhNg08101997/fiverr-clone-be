import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoaiCongViecService } from './loai-cong-viec.service';
import { CreateLoaiCongViecDto } from './dtos/create-loai-cong-viec.dto';

@Controller('api/loai-cong-viec')
export class LoaiCongViecController {
  constructor(private readonly loaiCongViecService: LoaiCongViecService) {}

  @Post()
  create(@Body() dto: CreateLoaiCongViecDto) {
    return this.loaiCongViecService.create(dto);
  }

  @Get()
  findAll() {
    return this.loaiCongViecService.findAll();
  }
}
