import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import  * as cookieParser from 'cookie-parser'
import "reflect-metadata"

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
