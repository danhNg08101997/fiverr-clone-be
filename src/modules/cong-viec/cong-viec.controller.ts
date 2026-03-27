import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CongViecService } from './cong-viec.service';
import { CreateCongViecDto } from './dtos/create-cong-viec.dto';
import { QueryLoaiCongViecDto } from '../../common/dtos/query-loai-cong-viec.dto';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { successResponse } from '../../common/utils/response.util';

@ApiTags('Công việc')
@Controller('cong-viec')
export class CongViecController {
  constructor(private readonly congViecService: CongViecService) {}

  // POST api/cong-viec
  @Post()
  @ApiResponse({ status: 201, description: 'Tạo công việc thành công' })
  create(@Body() dto: CreateCongViecDto) {
    return this.congViecService.create(dto);
  }

  // GET api/cong-viec
  @Get()
  @ApiResponse({ status: 200, description: 'Lấy danh sách thành công' })
  findAll() {
    return this.congViecService.findAll();
  }

  // GET api/cong-viec/phan-trang-tim-kiem
  @Get('phan-trang-tim-kiem')
  @ApiQuery({ name: 'pageIndex', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiQuery({ name: 'keyword', required: false })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách phân trang thành công',
  })
  findAllPaginationAndSearch(@Query() query: QueryLoaiCongViecDto) {
    return this.congViecService.findAllPaginationAndSearch(query);
  }

  //GET api/cong-viec/lay-menu-loai-cong-viec
  @Get('lay-menu-loai-cong-viec')
  @ApiResponse({
    status: 200,
    description: 'Lấy menu loại công việc thành công',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy menu loại công việc',
  })
  async getMenuLoaiCongViec() {
    const content = await this.congViecService.getMenuLoaiCongViec();
    return successResponse(content, 'Lấy menu loại công việc thành công');
  }

  // GET api/cong-viec/{id}
  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Lấy chi tiết thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy công việc' })
  findOne(@Param('id') id: string) {
    return this.congViecService.findOne(id);
  }
}
