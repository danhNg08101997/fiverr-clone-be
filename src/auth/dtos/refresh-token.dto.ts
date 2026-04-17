import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  userId: number;

  @ApiProperty()
  @IsString()
  refreshToken: string;
}
