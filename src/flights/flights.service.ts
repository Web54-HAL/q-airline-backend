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
    const inputDate = new Date(createFlightDto.start_date);
    const currentDate = new Date();

    if (inputDate < currentDate) {
      throw new BadRequestException(
        'start_date must not be earlier than current date.',
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
    const {
      flight_type,
      start_pos,
      end_pos,
      start_date,
      end_date,
      passenger_seat_count,
    } = searchFlightsDto;

    const { data, error } = await this.supabaseService.supabaseClient
      .from('available_seats_view')
      .select()
      .match({ flight_type, start_pos, end_pos, start_date, end_date })
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

    if (data.length === 0)
      throw new NotFoundException(`Cannot find flight with id: ${id}`);

    return data;
  }

  async update(id: number, updateFlightDto: UpdateFlightDto) {
    const flightEntity = await this.findOne(id);

    const inputDate = new Date(updateFlightDto.start_date);
    const originalDate = new Date(flightEntity.start_date);

    if (inputDate < originalDate) {
      throw new BadRequestException(
        'New start_date must not be earlier than old start_date.',
      );
    }

    const { data, error } = await this.supabaseService.supabaseClient
      .from(this.flightTableName)
      .update(updateFlightDto)
      .eq('flight_id', id)
      .select()
      .single();

    if (error) throw new BadRequestException(error);
    if (data.length === 0)
      throw new NotFoundException(`Can't find flight with id: ${id} to patch.`);

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
}
