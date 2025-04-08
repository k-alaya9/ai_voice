import { Test, TestingModule } from '@nestjs/testing';
import { AivoiceController } from './aivoice.controller';

describe('AivoiceController', () => {
  let controller: AivoiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AivoiceController],
    }).compile();

    controller = module.get<AivoiceController>(AivoiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
