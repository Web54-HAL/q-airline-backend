import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { FlightsService } from './flights.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { PublicEndpoint } from 'src/decorators/PublicEndpoint';
import { FindFlightDto } from './dto/find_flight.dto';

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
  async getAll() {
    return await this.flightsService.getAll();
  }

  @PublicEndpoint()
  @Get('search')
  async findAll(@Body(ValidationPipe) findFlightDto: FindFlightDto) {
    return await this.flightsService.findAll(findFlightDto);
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
