import { Controller, Get } from '@nestjs/common';
import { AivoiceService } from './aivoice.service';

@Controller('aivoice')
export class AivoiceController {
    constructor(private readonly aivoiceService: AivoiceService) { }
    @Get()
    async getSession() {
        try {
            const result = await this.aivoiceService.getSession();
            return result;
        } catch (error) {
            return { message: 'Error fetching session', error: error.message };
        }
    }
}
