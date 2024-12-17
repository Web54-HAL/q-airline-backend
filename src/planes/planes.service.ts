import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlaneDto } from './dto/create-plane.dto';
import { UpdatePlaneDto } from './dto/update-plane.dto';
import { SupabaseService } from 'src/supabase/supabase.service';
import { GetAllPlanesQueryDto } from './dto/get-planes-query.dto';

@Injectable()
export class PlanesService {
  private readonly planesTableName = 'planes';

  constructor(private readonly supabaseService: SupabaseService) {}

  async create(createPlaneDto: CreatePlaneDto) {
    const { data, error } = await this.supabaseService.supabaseClient
      .from(this.planesTableName)
      .insert(createPlaneDto)
      .select()
      .single();

    if (error) throw new BadRequestException(error);

    return data;
  }

  async findAll(queryParameters: GetAllPlanesQueryDto) {
    const { data, error } = await this.supabaseService.supabaseClient
      .from(this.planesTableName)
      .select()
      .match(queryParameters);

    if (error) throw new BadRequestException(error);

    return data;
  }

  async findOne(id: number) {
    const { data, error } = await this.supabaseService.supabaseClient
      .from(this.planesTableName)
      .select()
      .eq('plane_id', id)
      .single();

    if (error) throw new BadRequestException(error);

    if (data.length === 0)
      throw new NotFoundException(`Not found plane with id: ${id}`);

    return data;
  }

  async update(id: number, updatePlaneDto: UpdatePlaneDto) {
    const { data, error } = await this.supabaseService.supabaseClient
      .from(this.planesTableName)
      .update(updatePlaneDto)
      .eq('plane_id', id)
      .select()
      .single();

    if (error) throw new BadRequestException(error);

    if (data.length === 0)
      throw new NotFoundException(`Not found plane with id: ${id} to update`);

    return data;
  }

  async remove(id: number) {
    const { data, error } = await this.supabaseService.supabaseClient
      .from(this.planesTableName)
      .delete()
      .eq('plane_id', id)
      .select()
      .single();

    if (error) throw new BadRequestException(error);

    return data;
  }
}
