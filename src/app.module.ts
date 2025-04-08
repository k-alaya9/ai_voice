import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AivoiceModule } from './aivoice/aivoice.module';
import { HttpModule } from '@nestjs/axios/dist/http.module';

@Module({
  imports: [AivoiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
