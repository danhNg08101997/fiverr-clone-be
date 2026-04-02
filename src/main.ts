import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/exception/http-exception.filter';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.enableShutdownHooks();

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
        const formattedErrors = errors.map((error) => ({
          field: error.property,
          errors: Object.values(error.constraints || {}),
        }));

        return new BadRequestException({
          message: 'Dữ liệu đầu vào không hợp lệ',
          errors: formattedErrors,
        });
      },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Fiverr Clone API')
    .setDescription('Backend API for Fiverr clone project')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: false,
      urls: [
        {
          url: 'swagger/json',
          name: 'Fiverr',
        },
      ],
    },
    customSiteTitle: 'Fiverr Clone Swagger',
    jsonDocumentUrl: 'swagger/json',
    customCss: `
    .swagger-ui .parameters-col_description { margin-bottom: 2em; width: 50%; }
    .swagger-ui .parameters-col_description input { max-width: 500px; width: 100%; }
    .swagger-ui .response-col_links { display: none; }
    // .swagger-ui .response-col_description { width: 50%; }
    .swagger-ui .opblock-control-arrow { display: none; }
    .swagger-ui .auth-btn-wrapper { justify-content: space-between; }
    .swagger-ui .auth-container input[type=password], .swagger-ui .auth-container input[type=text] { width: 100%; }
    `,
  });

  const port = Number(process.env.PORT || 3000);
  await app.listen(port, '0.0.0.0');

  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger is running on: ${await app.getUrl()}/swagger`);
}
bootstrap();
