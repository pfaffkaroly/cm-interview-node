import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const PORT = 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('/api/v1');
  
  await app.listen(PORT);
  
  const logger: Logger = new Logger(bootstrap.name);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
