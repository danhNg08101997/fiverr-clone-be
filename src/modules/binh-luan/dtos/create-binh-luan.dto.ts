import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateBinhLuanDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  maCongViec: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  maNguoiBinhLuan: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  noiDung: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  saoBinhLuan: number;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  ngayBinhLuan: Date;
}
