import { Body, Controller, Post } from '@nestjs/common';
import { ChiTietLoaiCongViecService } from './chi-tiet-loai-cong-viec.service';
import { CreateChiTietLoaiCongViecDto } from './dtos/create-chi-tiet-loai-cong-viec.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Chi tiết loại công việc')
@Controller('chi-tiet-loai-cong-viec')
export class ChiTietLoaiCongViecController {
  constructor(
    private readonly chiTietLoaiCongViecService: ChiTietLoaiCongViecService,
  ) {}

  // POST api/chi-tiet-loai-cong-viec
  @Post()
  create(@Body() dto: CreateChiTietLoaiCongViecDto) {
    return this.chiTietLoaiCongViecService.create(dto);
  }
}
