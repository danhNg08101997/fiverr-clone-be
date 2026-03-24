import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateNhomChiTietLoaiCongViecDto } from './dtos/create-nhom-chi-tiet-loai-cong-viec.dto';
import { NhomChiTietLoaiCongViecService } from './nhom-chi-tiet-loai-cong-viec.service';
import { QueryLoaiCongViecDto } from '../../common/dtos/query-loai-cong-viec.dto';
import { UpdateNhomChiTietLoaiCongViecDto } from './dtos/update-nhom-chi-tiet-loai-cong-viec.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Nhóm chi tiết loại công việc')
@Controller('nhom-chi-tiet-loai-cong-viec')
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

  // GET /api/nhom-chi-tiet-loai-cong-viec/{id}
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nhomChiTietLoaiCongViecService.findOne(id);
  }

  // PUT /api/nhom-chi-tiet-loai-cong-viec/{id}
  @Put(':id')
  update(
    @Body() updateNhomLoaiChiTietCongViecDto: UpdateNhomChiTietLoaiCongViecDto,
    @Param('id') id: string,
  ) {
    return this.nhomChiTietLoaiCongViecService.update(
      id,
      updateNhomLoaiChiTietCongViecDto,
    );
  }
}
