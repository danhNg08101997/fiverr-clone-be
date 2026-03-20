import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ErrorHandlingMiddleware } from './common/filters/middleware/error-handling.middleware';
import { PinoLogger } from './utils/logger/pino.logger';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { CongViecModule } from './modules/cong-viec/cong-viec.module';
import { LoaiCongViecModule } from './modules/loai-cong-viec/loai-cong-viec.module';
import { NhomChiTietLoaiCongViecModule } from './modules/nhom-chi-tiet-loai-cong-viec/nhom-chi-tiet-loai-cong-viec.module';
import { ChiTietLoaiCongViecModule } from './modules/chi-tiet-loai-cong-viec/chi-tiet-loai-cong-viec.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    CongViecModule,
    LoaiCongViecModule,
    NhomChiTietLoaiCongViecModule,
    ChiTietLoaiCongViecModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: Logger,
      useClass: PinoLogger,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ErrorHandlingMiddleware) // Đăng ký middleware xử lý lỗi
      .forRoutes('*'); // Áp dụng cho tất cả các route, có thể thay đổi theo nhu cầu
  }
}
