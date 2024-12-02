import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class FlightsService {
  private readonly flightTableName = 'flights';

  constructor(private readonly supabaseService: SupabaseService) {}

  async create(createFlightDto: CreateFlightDto) {
    const { data, error } = await this.supabaseService.supabaseClient
      .from(this.flightTableName)
      .insert(createFlightDto)
      .select();

    if (error) throw new BadRequestException(error);
    return data;
  }

  async findAll() {
    const { data } = await this.supabaseService.supabaseClient
      .from(this.flightTableName)
      .select();

    return data;
  }

  async findOne(id: number) {
    const { data } = await this.supabaseService.supabaseClient
      .from(this.flightTableName)
      .select()
      .eq('flight_id', id);

    if (data.length === 0)
      throw new NotFoundException(`Cannot find flight with id: ${id}`);

    return data;
  }

  async update(id: number, updateFlightDto: UpdateFlightDto) {
    const { data, error } = await this.supabaseService.supabaseClient
      .from(this.flightTableName)
      .update(updateFlightDto)
      .eq('flight_id', id)
      .select();

    if (error) throw new BadRequestException(error);
    if (data.length === 0)
      throw new NotFoundException(`Can't find flight with id: ${id} to patch.`);

    return data;
  }

  async remove(id: number) {
    const response = await this.supabaseService.supabaseClient
      .from(this.flightTableName)
      .delete()
      .eq('flight_id', id);

    return response;
  }
}
