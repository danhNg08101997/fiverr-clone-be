import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateNhomChiTietLoaiCongViecDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  tenNhom: string;

  @IsString()
  hinhAnh: string;

  @IsInt()
  maLoaiCongViec: number;
}
