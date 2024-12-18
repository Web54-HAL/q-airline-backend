import { Test, TestingModule } from '@nestjs/testing';
import { PositionMapService } from './position_map.service';

describe('PositionMapService', () => {
  let service: PositionMapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PositionMapService],
    }).compile();

    service = module.get<PositionMapService>(PositionMapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
