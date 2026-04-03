import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCongViecDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  tenCongViec: string;

  @ApiProperty({ example: 743 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  danhGia?: number; // PROD => không nên cho client tự nhập => nên để service/backend tự tính

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  giaTien?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUrl(
    { require_protocol: true },
    {
      message:
        'hinh_anh phải là URL hợp lệ, ví dụ https://domain.com/image.jpg',
    },
  )
  hinhAnh?: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  nguoiTao?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  moTa?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  moTaNgan?: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(5)
  @IsOptional()
  saoCongViec?: number; // PROD => không nên cho client tự nhập => nên để service/backend tự tính

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  maChiTietLoai: number;
}
