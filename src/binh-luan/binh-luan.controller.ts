import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BinhLuanService } from './binh-luan.service';
import { CreateBinhLuanDto } from './dtos/create-binh-luan.dto';
import { UpdateBinhLuanDto } from './dtos/update-binh-luan.dto';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/role.enum';

@ApiTags('Bình luận')
@Controller('binh-luan')
export class BinhLuanController {
  constructor(private readonly binhLuanService: BinhLuanService) {}

  // GET api/binh-luan
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN_ENUM)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách bình luận thành công',
  })
  findAll() {
    return this.binhLuanService.findAll();
  }

  // POST api/binh-luan
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN_ENUM)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Tạo bình luận thành công' })
  create(@Body() dto: CreateBinhLuanDto) {
    return this.binhLuanService.create(dto);
  }

  // PUT api/binh-luan
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN_ENUM)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Sửa bình luận theo Id thành công' })
  update(@Param('id') id: string, @Body() updateDto: UpdateBinhLuanDto) {
    return this.binhLuanService.update(id, updateDto);
  }

  // GET api/binh-luan/lay-binh-luan-theo-cong-viec/{MaCongViec}
  @Get('lay-binh-luan-theo-cong-viec/:MaCongViec')
  @ApiParam({ name: 'MaCongViec', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Lấy bình luận công việc theo Id thành công',
  })
  getBinhLuanCongViec(@Param('MaCongViec') maCongViec: string) {
    return this.binhLuanService.getBinhLuanCongViec(maCongViec);
  }

  // DELETE api/binh-luan/{id}
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN_ENUM)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Xóa bình luận theo Id thành công' })
  deleteBinhLuan(@Param('id') id: string) {
    return this.binhLuanService.deleteBinhLuan(id);
  }
}
