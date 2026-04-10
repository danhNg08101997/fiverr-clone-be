import { Module } from '@nestjs/common';
import { CongViecService } from './cong-viec.service';
import { CongViecController } from './cong-viec.controller';
import { RolesGuard } from '../../guard/roles.guard';

@Module({
  providers: [CongViecService, RolesGuard],
  controllers: [CongViecController],
})
export class CongViecModule {}
