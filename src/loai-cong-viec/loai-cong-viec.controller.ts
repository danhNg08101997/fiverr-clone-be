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
import { LoaiCongViecService } from './loai-cong-viec.service';
import { CreateLoaiCongViecDto } from './dtos/create-loai-cong-viec.dto';
import { QueryPaginationAndSearch } from '../common/dtos/query-pagination-and-search.dto';
import { UpdateLoaiCongViecDto } from './dtos/update-loai-cong-viec.dto';
import {
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/role.enum';

@ApiTags('Loại công việc')
@Controller('loai-cong-viec')
export class LoaiCongViecController {
  constructor(private readonly loaiCongViecService: LoaiCongViecService) {}

  // POST /api/loai-cong-viec
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN_ENUM)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Tạo loại công việc thành công' })
  create(@Body() dto: CreateLoaiCongViecDto) {
    return this.loaiCongViecService.create(dto);
  }

  // GET /api/loai-cong-viec
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách loại công việc thành công',
  })
  findAll() {
    return this.loaiCongViecService.findAll();
  }

  // GET /api/loai-cong-viec/phan-trang-tim-kiem?pageIndex=1&pageSize=10&keyword=abc
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
    return this.loaiCongViecService.findAllPaginationAndSearch(query);
  }

  // GET /api/loai-cong-viec/{id}
  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Lấy loại công việc theo Id thành công',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy loại công việc theo Id',
  })
  findOne(@Param('id') id: string) {
    return this.loaiCongViecService.findOne(id);
  }

  // PUT api/loai-cong-viec/{id}
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN_ENUM)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Sửa loại công việc theo Id thành công',
  })
  update(
    @Param('id') id: string,
    @Body() updateLoaiCongViecDto: UpdateLoaiCongViecDto,
  ) {
    return this.loaiCongViecService.update(id, updateLoaiCongViecDto);
  }

  // DELETE api/loai-cong-viec/{id}
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN_ENUM)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Xóa loại công việc theo Id thành công',
  })
  deleteLoaiCongViec(@Param('id') id: string) {
    return this.loaiCongViecService.deleteLoaiCongViec(id);
  }
}
