import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FlightsService } from './flights.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { PublicEndpoint } from 'src/decorators/PublicEndpoint';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @PublicEndpoint()
  @Post()
  async create(@Body() createFlightDto: CreateFlightDto) {
    return await this.flightsService.create(createFlightDto);
  }

  @PublicEndpoint()
  @Get()
  async findAll() {
    return await this.flightsService.findAll();
  }

  @PublicEndpoint()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.flightsService.findOne(+id);
  }

  @PublicEndpoint()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFlightDto: UpdateFlightDto,
  ) {
    return await this.flightsService.update(+id, updateFlightDto);
  }

  @PublicEndpoint()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.flightsService.remove(+id);
  }
}
