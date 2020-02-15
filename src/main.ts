import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: false,
    validationError: {
      value: false,
      target: false
    },
  }));
  app.setGlobalPrefix('api');
  await app.listen(AppModule.port);
}
bootstrap();
