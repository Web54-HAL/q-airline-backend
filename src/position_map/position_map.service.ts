import { BadRequestException, Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class PositionMapService {
  private readonly positionMapTableName = 'position_map';

  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll() {
    const { data, error } = await this.supabaseService.supabaseClient
      .from(this.positionMapTableName)
      .select();

    if (error) throw new BadRequestException(error);

    return data;
  }
}
