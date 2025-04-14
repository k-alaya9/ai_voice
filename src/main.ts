import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { hostname } from 'os';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://k-alaya9.github.io',
    methods: 'GET',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000,'0.0.0.0');
}
bootstrap();
