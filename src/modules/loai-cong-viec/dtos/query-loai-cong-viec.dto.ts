import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class QueryLoaiCongViecDto {
  // @Transform((value) => Number(value))
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageIndex: number;

  // @Transform((value) => Number(value))
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize: number;

  @IsOptional()
  @IsString()
  keyword?: string;
}
