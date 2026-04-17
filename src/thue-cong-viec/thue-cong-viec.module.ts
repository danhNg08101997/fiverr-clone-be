import { Module } from '@nestjs/common';
import { ThueCongViecController } from './thue-cong-viec.controller';
import { ThueCongViecService } from './thue-cong-viec.service';

@Module({
  controllers: [ThueCongViecController],
  providers: [ThueCongViecService]
})
export class ThueCongViecModule {}
