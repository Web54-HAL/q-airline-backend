import { Test, TestingModule } from '@nestjs/testing';
import { PlanesService } from './planes.service';

describe('PlanesService', () => {
  let service: PlanesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanesService],
    }).compile();

    service = module.get<PlanesService>(PlanesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
