import { Logger, Module } from '@nestjs/common';
import { PinoLogger } from './utils/logger/pino.logger';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { CongViecModule } from './modules/cong-viec/cong-viec.module';
import { LoaiCongViecModule } from './modules/loai-cong-viec/loai-cong-viec.module';
import { NhomChiTietLoaiCongViecModule } from './modules/nhom-chi-tiet-loai-cong-viec/nhom-chi-tiet-loai-cong-viec.module';
import { ChiTietLoaiCongViecModule } from './modules/chi-tiet-loai-cong-viec/chi-tiet-loai-cong-viec.module';
import { ConfigModule } from '@nestjs/config';
import { BinhLuanModule } from './modules/binh-luan/binh-luan.module';
import { NguoiDungModule } from './modules/nguoi-dung/nguoi-dung.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    BinhLuanModule,
    LoaiCongViecModule,
    NhomChiTietLoaiCongViecModule,
    ChiTietLoaiCongViecModule,
    CongViecModule,
    NguoiDungModule,
  ],
  controllers: [],
  providers: [
    {
      provide: Logger,
      useClass: PinoLogger,
    },
  ],
})
export class AppModule {}
