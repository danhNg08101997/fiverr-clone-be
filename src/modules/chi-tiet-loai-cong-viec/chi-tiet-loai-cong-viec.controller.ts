import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ChiTietLoaiCongViecService } from './chi-tiet-loai-cong-viec.service';
import { CreateChiTietLoaiCongViecDto } from './dtos/create-chi-tiet-loai-cong-viec.dto';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateChiTietLoaiCongViecDto } from './dtos/update-chi-tiet-loai-cong-viec.dto';
import { JwtAuthGuard } from '../../guard/jwt-auth.guard';
import { RolesGuard } from '../../guard/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums/role.enum';

@ApiTags('Chi tiết loại công việc')
@Controller('chi-tiet-loai-cong-viec')
export class ChiTietLoaiCongViecController {
  constructor(
    private readonly chiTietLoaiCongViecService: ChiTietLoaiCongViecService,
  ) {}

  // POST api/chi-tiet-loai-cong-viec
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN_ENUM)
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Tạo chi tiết loại công việc thành công',
  })
  create(@Body() dto: CreateChiTietLoaiCongViecDto) {
    return this.chiTietLoaiCongViecService.create(dto);
  }

  // PUT api/chi-tiet-loai-cong-viec/{id}
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN_ENUM)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Sửa chi tiết loại công việc theo Id thành công',
  })
  update(@Param('id') id: string, @Body() dto: UpdateChiTietLoaiCongViecDto) {
    return this.chiTietLoaiCongViecService.update(id, dto);
  }
}
