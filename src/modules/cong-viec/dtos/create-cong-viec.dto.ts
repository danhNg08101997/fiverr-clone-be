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

export class CreateCongViecDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  tenCongViec: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  danhGia?: number; // PROD => không nên cho client tự nhập => nên để service/backend tự tính

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  giaTien?: number;

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

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nguoiTao?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  moTa?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  moTaNgan?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(5)
  @IsOptional()
  saoCongViec?: number; // PROD => không nên cho client tự nhập => nên để service/backend tự tính

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  maChiTietLoai: number;
}
