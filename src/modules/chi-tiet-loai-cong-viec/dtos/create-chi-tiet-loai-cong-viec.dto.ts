import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateChiTietLoaiCongViecDto {
  @IsString()
  @IsNotEmpty()
  tenChiTiet: string;

  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  maNhomChiTietLoaiCongViec?: number;
}
