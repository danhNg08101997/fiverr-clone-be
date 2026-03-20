import { Body, Controller, Post } from '@nestjs/common';
import { CongViecService } from './cong-viec.service';
import { CreateCongViecDto } from './dtos/create-cong-viec.dto';

@Controller('api/cong-viec')
export class CongViecController {
  constructor(private readonly congViecService: CongViecService) {}

  @Post('create')
  create(@Body() dto: CreateCongViecDto) {
    return this.congViecService.create(dto);
  }

  // @Get()
  // findAll(@Query() query: QueryGigDto) {
  //   return this.gigService.findAll(query);
  // }
  //
  // @Get(':id')
  // findOne(@Param() params: ParamsIdGigDto) {
  //   return this.gigService.findOne(params.id);
  // }
  //
  // @Patch(':id')
  // update(@Param() params: ParamsIdGigDto, @Body() dto: UpdateGigDto) {
  //   return this.gigService.update(params.id, dto);
  // }
  //
  // @Delete(':id')
  // remove(@Param() params: ParamsIdGigDto) {
  //   return this.gigService.remove(params.id);
  // }
}
