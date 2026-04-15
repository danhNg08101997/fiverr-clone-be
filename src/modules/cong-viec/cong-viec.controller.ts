import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CongViecService } from './cong-viec.service';
import { CreateCongViecDto } from './dtos/create-cong-viec.dto';
import {
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateCongViecDto } from './dtos/update-cong-viec.dto';
import { JwtAuthGuard } from '../../guard/jwt-auth.guard';
import { RolesGuard } from '../../guard/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums/role.enum';
import { QueryPaginationAndSearch } from '../../common/dtos/query-pagination-and-search.dto';

@ApiTags('Công việc')
@Controller('cong-viec')
export class CongViecController {
  constructor(private readonly congViecService: CongViecService) {}

  // POST api/cong-viec
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN_ENUM)
  @ApiBearerAuth()
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN_ENUM)
  @ApiBearerAuth()
  @ApiQuery({ name: 'pageIndex', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiQuery({ name: 'keyword', required: false })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách phân trang thành công',
  })
  findAllPaginationAndSearch(@Query() query: QueryPaginationAndSearch) {
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
    return await this.congViecService.getMenuLoaiCongViec();
  }

  // GET api/cong-viec/{id}
  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Lấy công việc theo Id thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy công việc' })
  findOne(@Param('id') id: string) {
    return this.congViecService.findOne(id);
  }

  // PUT api/cong-viec/{id}
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN_ENUM)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Sửa công việc theo Id thành công' })
  update(@Param('id') id: string, @Body() updateDto: UpdateCongViecDto) {
    return this.congViecService.update(id, updateDto);
  }

  // GET api/cong-viec/lay-chi-tiet-loai-cong-viec/{MaLoaiCongViec}
  @Get('lay-chi-tiet-loai-cong-viec/:MaLoaiCongViec')
  @ApiParam({ name: 'MaLoaiCongViec', type: Number })
  getChiTietLoaiCongViec(@Param('MaLoaiCongViec') maLoaiCongViec: string) {
    return this.congViecService.getChiTietLoaiCongViec(maLoaiCongViec);
  }

  // GET api/cong-viec/lay-cong-viec-theo-chi-tiet-loai/{MaChiTietLoai}
  @Get('lay-cong-viec-theo-chi-tiet-loai/:MaChiTietLoai')
  @ApiParam({ name: 'MaChiTietLoai', type: Number })
  getCongViecTheoChiTietLoai(@Param('MaChiTietLoai') maChiTietLoai: string) {
    return this.congViecService.getCongViecTheoChiTietLoai(maChiTietLoai);
  }

  // GET api/cong-viec/lay-danh-sach-cong-viec-theo-ten/{TenCongViec}
  @Get('lay-danh-sach-cong-viec-theo-ten/:TenCongViec')
  @ApiParam({ name: 'TenCongViec', type: String })
  getCongVietTheoTen(@Param('TenCongViec') tenCongViec: string) {
    return this.congViecService.getCongVietTheoTen(tenCongViec);
  }

  // GET api/cong-viec/lay-cong-viec-chi-tiet/{MaCongViec}
  @Get('lay-cong-viec-chi-tiet/:MaCongViec')
  @ApiParam({ name: 'MaCongViec', type: Number })
  getCongViecTheoMaCongViec(@Param('MaCongViec') maCongViec: string) {
    return this.congViecService.getCongViecTheoMaCongViec(maCongViec);
  }

  // GET api/cong-viec/lay-danh-sach-cong-viec-theo-ten/{TenCongViec}
  @Get('lay-danh-sach-cong-viec-theo-ten/:TenCongViec')
  @ApiParam({ name: 'TenCongViec', type: String })
  getCongViecTheoTenCongViec(@Param('TenCongViec') tenCongViec: string) {
    return this.congViecService.getCongViecTheoTenCongViec(tenCongViec);
  }

  // DELETE api/cong-viec/{id}
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN_ENUM)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number })
  delete(@Param('id') id: string) {
    return this.congViecService.delete(id);
  }
}
