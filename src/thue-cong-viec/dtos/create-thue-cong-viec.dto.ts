import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt } from 'class-validator';

export class CreateThueCongViecDto {
  @ApiProperty()
  @IsInt()
  maCongViec: number;

  @ApiProperty()
  @IsInt()
  maNguoiThue: number;

  @ApiProperty()
  @IsDate()
  ngayThue: Date;
}
