import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));

  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('PORT');

  await app.listen(port || 8000);
}
bootstrap();
