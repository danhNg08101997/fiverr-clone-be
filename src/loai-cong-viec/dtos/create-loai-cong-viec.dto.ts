import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLoaiCongViecDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  tenLoaiCongViec: string;
}
