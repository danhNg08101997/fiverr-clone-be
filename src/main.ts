import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/exception/http-exception.filter';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalFilters(new HttpExceptionFilter()); // Áp dụng Global Exception Filter

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors) => {
        return new BadRequestException(errors);
      },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Fiverr Clone API')
    .setVersion('v1')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: false,
      urls: [
        {
          url: '/swagger/v1/swagger.json',
          name: 'Fiverr',
        },
      ],
    },
    customSiteTitle: 'Fiverr Clone Swagger',
    jsonDocumentUrl: 'swagger/v1/swagger.json',
    customCss: `
    .swagger-ui .parameters-col_description { margin-bottom: 2em; width: 50%; }
    .swagger-ui .parameters-col_description input { max-width: 500px; width: 100%; }
    .swagger-ui .response-col_links { display: none; }
    .swagger-ui .response-col_description { width: 50%; }
    .swagger-ui .opblock-control-arrow { display: none; }
    `,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
