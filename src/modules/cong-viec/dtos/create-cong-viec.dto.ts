import {
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
  @ApiProperty({ example: 'I will design a minimalist logo' })
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

  @ApiProperty({ example: 150 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  giaTien?: number;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
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

  @ApiProperty({
    example: 'Mô tả chi tiết cho công việc...',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nguoiTao?: string;

  @ApiProperty({
    example: 'Mô tả ngắn cho công việc',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  moTa?: string;

  @ApiProperty({ example: 5 })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  moTaNgan?: string;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(5)
  @IsOptional()
  saoCongViec?: number; // PROD => không nên cho client tự nhập => nên để service/backend tự tính

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  maChiTietLoai: number;
}
