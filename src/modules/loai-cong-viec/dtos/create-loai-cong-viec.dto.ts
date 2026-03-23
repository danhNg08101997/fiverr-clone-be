import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateLoaiCongViecDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  tenLoaiCongViec: string;
}
