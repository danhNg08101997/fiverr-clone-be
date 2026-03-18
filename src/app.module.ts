import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ErrorHandlingMiddleware } from './common/filters/middleware/error-handling.middleware';
import { PinoLogger } from './utils/logger/pino.logger';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, AuthModule],
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
