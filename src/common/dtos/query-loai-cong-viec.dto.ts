import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class QueryLoaiCongViecDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageIndex: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  keyword?: string;
}
