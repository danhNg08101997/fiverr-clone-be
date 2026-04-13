import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { NguoiDungService } from './nguoi-dung.service';
import { RegisterDto } from '../auth/dtos/register.dto';
import { AuthService } from '../auth/auth.service';
import { UpdateNguoiDungDto } from './dtos/update-nguoi-dung.dto';

@Controller('nguoi-dung')
@ApiTags('Người dùng')
export class NguoiDungController {
  constructor(
    private readonly nguoiDungService: NguoiDungService,
    private readonly authService: AuthService,
  ) {}

  // GET api/nguoi-dung
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách người dùng thành công',
  })
  findAll() {
    return this.nguoiDungService.findAll();
  }

  // POST api/nguoi-dung
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Tạo người dùng thành công',
  })
  create(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Put()
  @ApiResponse({
    status: 200,
    description: 'Sửa người dùng thành công',
  })
  update(@Param('id') id: string, @Body() req: UpdateNguoiDungDto) {
    return this.nguoiDungService.update(id, req);
  }
}
