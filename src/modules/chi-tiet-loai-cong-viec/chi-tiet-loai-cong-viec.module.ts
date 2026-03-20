import { Module } from '@nestjs/common';
import { ChiTietLoaiCongViecController } from './chi-tiet-loai-cong-viec.controller';
import { ChiTietLoaiCongViecService } from './chi-tiet-loai-cong-viec.service';

@Module({
  controllers: [ChiTietLoaiCongViecController],
  providers: [ChiTietLoaiCongViecService]
})
export class ChiTietLoaiCongViecModule {}
