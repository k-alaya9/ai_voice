import { Test, TestingModule } from '@nestjs/testing';
import { AivoiceService } from './aivoice.service';

describe('AivoiceService', () => {
  let service: AivoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AivoiceService],
    }).compile();

    service = module.get<AivoiceService>(AivoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
