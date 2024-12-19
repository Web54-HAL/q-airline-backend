import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class PromotionsService {
  private readonly promotionsTableName = 'promotions';

  constructor(private readonly supabaseService: SupabaseService) {}

  async create(createPromotionDto: CreatePromotionDto) {
    const { data, error } = await this.supabaseService.supabaseClient
      .from(this.promotionsTableName)
      .insert(createPromotionDto)
      .select()
      .single();

    if (error) throw new BadRequestException(error);

    return data;
  }

  async findAll() {
    const { data, error } = await this.supabaseService.supabaseClient
      .from(this.promotionsTableName)
      .select();

    if (error) throw new BadRequestException(error);

    return data;
  }

  async getNewestAvailablePromotions(limitAmount: number) {
    const now = new Date().toISOString();

    const { data, error } = await this.supabaseService.supabaseClient
      .from(this.promotionsTableName)
      .select()
      .lte('start_date', now)
      .gte('end_date', now)
      .order('start_date', { ascending: true })
      .limit(limitAmount);

    if (error) throw new BadRequestException(error);

    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} promotion`;
  }

  update(id: number, updatePromotionDto: UpdatePromotionDto) {
    return updatePromotionDto;
  }

  remove(id: number) {
    return `This action removes a #${id} promotion`;
  }
}
