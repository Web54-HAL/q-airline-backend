import { Test, TestingModule } from '@nestjs/testing';
import { PositionMapController } from './position_map.controller';
import { PositionMapService } from './position_map.service';

describe('PositionMapController', () => {
  let controller: PositionMapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PositionMapController],
      providers: [PositionMapService],
    }).compile();

    controller = module.get<PositionMapController>(PositionMapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
