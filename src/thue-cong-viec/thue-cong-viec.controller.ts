import { Body, Controller, Get, Post } from '@nestjs/common';
import { ThueCongViecService } from './thue-cong-viec.service';
import { CreateThueCongViecDto } from './dtos/create-thue-cong-viec.dto';

@Controller('thue-cong-viec')
export class ThueCongViecController {
  constructor(private readonly service: ThueCongViecService) {}

  // POST api/thue-cong-viec
  // @Post()
  // create(@Body() req: CreateThueCongViecDto) {
  //   return this.service.create(req);
  // }
}
