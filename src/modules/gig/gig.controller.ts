import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Query,
  Param,
} from '@nestjs/common';
import { GigService } from './gig.service';
import { CreateGigDto } from './dtos/create-gig.dto';
import { QueryGigDto } from './dtos/query-gig.dto';
import { ParamsIdGigDto } from './dtos/param-id-gig.dto';
import { UpdateGigDto } from './dtos/update-gig.dto';

@Controller('api/v1/gig')
export class GigController {
  constructor(private readonly gigService: GigService) {}

  @Post('create')
  create(@Body() dto: CreateGigDto) {
    return this.gigService.create(dto);
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
