import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNhomChiTietLoaiCongViecDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  tenNhom: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  hinhAnh?: string;

  @ApiProperty()
  @IsInt()
  maLoaiCongViec: number;
}
