import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { hostname } from 'os';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://127.0.0.1:8080',
    methods: 'GET',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000,'0.0.0.0');
}
bootstrap();
