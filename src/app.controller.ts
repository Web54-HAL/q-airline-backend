import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PublicEndpoint } from './decorators/PublicEndpoint';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @PublicEndpoint()
  @Get("/flights")
  async getFlightsTable() {
    const { data, error } = await this.appService.getFlightsTable();
    return data ;
  };

}
