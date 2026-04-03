import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNhomChiTietLoaiCongViecDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  tenNhom: string;

  @ApiProperty()
  @IsString()
  hinhAnh: string;

  @ApiProperty()
  @IsInt()
  maLoaiCongViec: number;
}
