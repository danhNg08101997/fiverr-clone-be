import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChiTietLoaiCongViecDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  tenChiTiet: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  maNhomChiTietLoaiCongViec?: number;
}
