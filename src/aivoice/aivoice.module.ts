import { Module } from '@nestjs/common';
import { AivoiceController } from './aivoice.controller';
import { AivoiceService } from './aivoice.service';
import { HttpModule } from '@nestjs/axios/dist/http.module';


@Module({
    imports: [HttpModule],
    controllers: [AivoiceController],
    providers: [AivoiceService],
})
export class AivoiceModule { }
