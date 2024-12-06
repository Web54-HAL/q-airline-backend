import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { FlightsService } from './flights.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { PublicEndpoint } from 'src/decorators/PublicEndpoint';
import { SearchFlightsDto } from './dto/search-flights.dto';
import { RoleGuard } from 'src/guards/user-role.guard';
import { EndpointUserRole } from 'src/decorators/EndpointUserRole';
import { UserRole } from 'src/enums/UserRole';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @PublicEndpoint()
  @Post()
  async create(@Body() createFlightDto: CreateFlightDto) {
    return await this.flightsService.create(createFlightDto);
  }

  @EndpointUserRole(UserRole.Admin)
  @UseGuards(RoleGuard)
  @Get()
  async getAll() {
    return await this.flightsService.getAll();
  }

  @PublicEndpoint()
  @Post('search')
  async searchFlights(
    @Body(ValidationPipe) searchFlightsDto: SearchFlightsDto,
  ) {
    return await this.flightsService.searchFlights(searchFlightsDto);
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
