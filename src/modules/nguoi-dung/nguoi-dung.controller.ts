import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NguoiDungService } from './nguoi-dung.service';
import { RegisterDto } from '../auth/dtos/register.dto';
import { AuthService } from '../auth/auth.service';
import { UpdateNguoiDungDto } from './dtos/update-nguoi-dung.dto';
import { QueryPaginationAndSearch } from '../../common/dtos/query-pagination-and-search.dto';

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
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy danh sách người dùng',
  })
  findAll() {
    return this.nguoiDungService.findAll();
  }

  // GET /api/nguoi-dung/phan-trang-tim-kiem?pageIndex=1&pageSize=10&keyword=abc
  @Get('phan-trang-tim-kiem')
  @ApiQuery({ name: 'pageIndex', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiQuery({ name: 'keyword', required: false })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách phân trang thành công',
  })
  findAllPaginationAndSearch(@Query() query: QueryPaginationAndSearch) {
    return this.nguoiDungService.findAllPaginationAndSearch(query);
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

  // PUT api/nguoi-dung/{id}
  @Put(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Sửa người dùng thành công',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() req: UpdateNguoiDungDto,
  ) {
    return this.nguoiDungService.update(id, req);
  }

  // DELETE api/nguoi-dung/{id}
  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Xóa người dùng thành công',
  })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.nguoiDungService.delete(id);
  }

  // GET api/nguoi-dung/{id}
  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Tìm kiếm người dùng theo Id thành công',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy người dùng',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.nguoiDungService.findOne(id);
  }

  // GET api/nguoi-dung/{tenNguoiDung}
  @Get('tiem-kiem/:TenNguoiDung')
  @ApiParam({ name: 'TenNguoiDung', type: String })
  @ApiResponse({
    status: 200,
    description: 'Tìm kiếm người dùng theo tên thành công',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy người dùng',
  })
  findName(@Param('TenNguoiDung') tenNguoiDung: string) {
    return this.nguoiDungService.getNguoiDungTheoTen(tenNguoiDung);
  }
}
