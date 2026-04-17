import { Module } from '@nestjs/common';
import { LoaiCongViecController } from './loai-cong-viec.controller';
import { LoaiCongViecService } from './loai-cong-viec.service';

@Module({
  controllers: [LoaiCongViecController],
  providers: [LoaiCongViecService],
})
export class LoaiCongViecModule {}
