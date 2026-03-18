import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  role: string;

  @IsOptional()
  @IsString()
  birthday?: string;

  @IsOptional()
  @IsBoolean()
  gender?: boolean;

  @IsOptional()
  @IsString()
  skill?: string;

  @IsOptional()
  @IsString()
  certification?: string;
}
