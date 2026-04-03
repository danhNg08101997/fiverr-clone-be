import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ChiTietLoaiCongViecService } from './chi-tiet-loai-cong-viec.service';
import { CreateChiTietLoaiCongViecDto } from './dtos/create-chi-tiet-loai-cong-viec.dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateChiTietLoaiCongViecDto } from './dtos/update-chi-tiet-loai-cong-viec.dto';

@ApiTags('Chi tiết loại công việc')
@Controller('chi-tiet-loai-cong-viec')
export class ChiTietLoaiCongViecController {
  constructor(
    private readonly chiTietLoaiCongViecService: ChiTietLoaiCongViecService,
  ) {}

  // POST api/chi-tiet-loai-cong-viec
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Tạo chi tiết loại công việc thành công',
  })
  create(@Body() dto: CreateChiTietLoaiCongViecDto) {
    return this.chiTietLoaiCongViecService.create(dto);
  }

  // PUT api/chi-tiet-loai-cong-viec/{id}
  @Put(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Sửa chi tiết loại công việc theo Id thành công',
  })
  update(@Param('id') id: string, @Body() dto: UpdateChiTietLoaiCongViecDto) {
    return this.chiTietLoaiCongViecService.update(id, dto);
  }
}
