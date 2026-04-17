import { Module } from '@nestjs/common';
import { NhomChiTietLoaiCongViecController } from './nhom-chi-tiet-loai-cong-viec.controller';
import { NhomChiTietLoaiCongViecService } from './nhom-chi-tiet-loai-cong-viec.service';

@Module({
  controllers: [NhomChiTietLoaiCongViecController],
  providers: [NhomChiTietLoaiCongViecService],
})
export class NhomChiTietLoaiCongViecModule {}
