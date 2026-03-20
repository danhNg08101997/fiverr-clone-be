import { Module } from '@nestjs/common';
import { CongViecService } from './cong-viec.service';
import { CongViecController } from './cong-viec.controller';

@Module({
  providers: [CongViecService],
  controllers: [CongViecController],
})
export class CongViecModule {}
