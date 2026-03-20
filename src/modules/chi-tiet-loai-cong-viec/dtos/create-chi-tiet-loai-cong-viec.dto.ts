import { IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateChiTietLoaiCongViecDto {
  @IsString()
  @IsNotEmpty()
  tenChiTiet: string;

  @IsInt()
  @IsNotEmpty()
  maNhomChiTietLoaiCongViec: number;
}
