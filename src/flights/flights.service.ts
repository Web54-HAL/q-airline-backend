import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { SupabaseService } from 'src/supabase/supabase.service';
import { SearchFlightsDto } from './dto/search-flights.dto';

@Injectable()
export class FlightsService {
  private readonly flightTableName = 'flights';

  constructor(private readonly supabaseService: SupabaseService) {}

  async create(createFlightDto: CreateFlightDto) {
    const inputDate = new Date(createFlightDto.time_start);
    const currentDate = new Date();

    if (inputDate < currentDate) {
      throw new BadRequestException(
        'time_start must not be earlier than current date.',
      );
    }

    const { data, error } = await this.supabaseService.supabaseClient
      .from(this.flightTableName)
      .insert(createFlightDto)
      .select()
      .single();

    if (error) throw new BadRequestException(error);
    return data;
  }

  async getAll() {
    const { data } = await this.supabaseService.supabaseClient
      .from(this.flightTableName)
      .select();

    return data;
  }

  async searchFlights(searchFlightsDto: SearchFlightsDto) {
    const { from_pos, to_pos, time_start, passenger_seat_count } =
      searchFlightsDto;

    const { data, error } = await this.supabaseService.supabaseClient
      .from('available_seats_view')
      .select()
      .match({ from_pos, to_pos, time_start })
      .gte('available_seats', passenger_seat_count);

    if (error) throw new BadRequestException(error);
    if (data.length === 0)
      throw new NotFoundException('Find none flight with input data');

    return data;
  }

  async findOne(id: number) {
    const { data } = await this.supabaseService.supabaseClient
      .from(this.flightTableName)
      .select()
      .eq('flight_id', id)
      .single();

    return data;
  }

  async update(id: number, updateFlightDto: UpdateFlightDto) {
    const flightEntity = await this.findOne(id);

    // Validate date
    const inputDate = new Date(updateFlightDto.time_start);
    const originalDate = new Date(flightEntity.time_start);

    if (inputDate < originalDate) {
      throw new BadRequestException(
        'New time_start must not be earlier than old time_start.',
      );
    }

    // Validate from_pos != to_pos
    this.validatePositions(updateFlightDto, flightEntity);

    const { data, error } = await this.supabaseService.supabaseClient
      .from(this.flightTableName)
      .update(updateFlightDto)
      .eq('flight_id', id)
      .select()
      .single();

    if (error) throw new BadRequestException(error);

    return data;
  }

  async remove(id: number) {
    const response = await this.supabaseService.supabaseClient
      .from(this.flightTableName)
      .delete()
      .eq('flight_id', id)
      .single();

    return response;
  }

  validatePositions(updateFlightDto: UpdateFlightDto, flightEntity: any) {
    if (
      updateFlightDto.from_pos &&
      updateFlightDto.to_pos &&
      updateFlightDto.from_pos == updateFlightDto.to_pos
    ) {
      throw new BadRequestException('New from_pos == New to_pos');
    }

    if (
      updateFlightDto.from_pos &&
      !updateFlightDto.to_pos &&
      updateFlightDto.from_pos == flightEntity.to_pos
    ) {
      throw new BadRequestException('New from_pos == Original to_pos');
    }

    if (
      updateFlightDto.to_pos &&
      !updateFlightDto.from_pos &&
      updateFlightDto.to_pos == flightEntity.from_pos
    ) {
      throw new BadRequestException('New to_pos == Original from_pos');
    }
  }
}
