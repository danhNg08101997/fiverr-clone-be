import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter()); // Áp dụng Global Exception Filter
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
