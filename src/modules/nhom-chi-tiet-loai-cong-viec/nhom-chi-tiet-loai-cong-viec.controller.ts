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
import { CreateNhomChiTietLoaiCongViecDto } from './dtos/create-nhom-chi-tiet-loai-cong-viec.dto';
import { NhomChiTietLoaiCongViecService } from './nhom-chi-tiet-loai-cong-viec.service';
import { UpdateNhomChiTietLoaiCongViecDto } from './dtos/update-nhom-chi-tiet-loai-cong-viec.dto';
import {
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guard/jwt-auth.guard';
import { RolesGuard } from '../../guard/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums/role.enum';
import { QueryPaginationAndSearch } from '../../common/dtos/query-pagination-and-search.dto';

@ApiTags('Nhóm chi tiết loại công việc')
@Controller('nhom-chi-tiet-loai-cong-viec')
export class NhomChiTietLoaiCongViecController {
  constructor(
    private readonly nhomChiTietLoaiCongViecService: NhomChiTietLoaiCongViecService,
  ) {}

  // POST api/nhom-chi-tiet-loai-cong-viec
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN_ENUM)
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Tạo nhóm chi tiết loại công việc thành công',
  })
  create(@Body() dto: CreateNhomChiTietLoaiCongViecDto) {
    return this.nhomChiTietLoaiCongViecService.create(dto);
  }

  // GET api/nhom-chi-tiet-loai-cong-viec
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách nhóm chi tiết loại công việc thành công',
  })
  findAll() {
    return this.nhomChiTietLoaiCongViecService.findAll();
  }

  // GET api/nhom-chi-tiet-loai-cong-viec/phan-trang-tim-kiem?pageIndex=1&pageSize=10&keyword=abc
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
    return this.nhomChiTietLoaiCongViecService.findAllPaginationAndSearch(
      query,
    );
  }

  // GET /api/nhom-chi-tiet-loai-cong-viec/{id}
  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Lấy nhóm chi tiết loại công việc theo Id thành công',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy nhóm chi tiết loại công việc',
  })
  findOne(@Param('id') id: string) {
    return this.nhomChiTietLoaiCongViecService.findOne(id);
  }

  // PUT /api/nhom-chi-tiet-loai-cong-viec/{id}
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN_ENUM)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Sửa nhóm chi tiết loại công việc theo Id thành công',
  })
  update(
    @Body() updateNhomLoaiChiTietCongViecDto: UpdateNhomChiTietLoaiCongViecDto,
    @Param('id') id: string,
  ) {
    return this.nhomChiTietLoaiCongViecService.update(
      id,
      updateNhomLoaiChiTietCongViecDto,
    );
  }

  //DELETE /api/nhom-chi-tiet-loai-cong-viec/{id}
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN_ENUM)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Xóa nhóm chi tiết loại công việc theo Id thành công',
  })
  delete(@Param('id') id: string) {
    return this.nhomChiTietLoaiCongViecService.delete(id);
  }
}
