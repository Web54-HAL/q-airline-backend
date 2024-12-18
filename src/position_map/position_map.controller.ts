import { Controller, Get } from '@nestjs/common';
import { PositionMapService } from './position_map.service';
import { PublicEndpoint } from 'src/decorators/PublicEndpoint';

@Controller('position-map')
export class PositionMapController {
  constructor(private readonly positionMapService: PositionMapService) {}

  @PublicEndpoint()
  @Get()
  async findAll() {
    return await this.positionMapService.findAll();
  }
}
