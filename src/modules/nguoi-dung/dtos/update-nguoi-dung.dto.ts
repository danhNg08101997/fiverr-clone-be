import { PartialType } from '@nestjs/swagger';
import { RegisterDto } from '../../auth/dtos/register.dto';

export class UpdateNguoiDungDto extends PartialType(RegisterDto) {}
