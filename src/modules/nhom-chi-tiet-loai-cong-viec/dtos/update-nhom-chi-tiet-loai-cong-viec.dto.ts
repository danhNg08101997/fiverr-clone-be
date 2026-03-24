import { PartialType } from '@nestjs/swagger';
import { CreateNhomChiTietLoaiCongViecDto } from './create-nhom-chi-tiet-loai-cong-viec.dto';

export class UpdateNhomChiTietLoaiCongViecDto extends PartialType(
  CreateNhomChiTietLoaiCongViecDto,
) {}
