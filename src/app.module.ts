import { Logger, Module } from '@nestjs/common';
import { PinoLogger } from './utils/logger/pino.logger';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { CongViecModule } from './cong-viec/cong-viec.module';
import { LoaiCongViecModule } from './loai-cong-viec/loai-cong-viec.module';
import { NhomChiTietLoaiCongViecModule } from './nhom-chi-tiet-loai-cong-viec/nhom-chi-tiet-loai-cong-viec.module';
import { ChiTietLoaiCongViecModule } from './chi-tiet-loai-cong-viec/chi-tiet-loai-cong-viec.module';
import { ConfigModule } from '@nestjs/config';
import { BinhLuanModule } from './binh-luan/binh-luan.module';
import { NguoiDungModule } from './nguoi-dung/nguoi-dung.module';
import { ThueCongViecModule } from './thue-cong-viec/thue-cong-viec.module';

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
    ThueCongViecModule,
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
