import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class PromotionsService {
  private readonly promotionsTableName = 'promotions';

  constructor(private readonly supabaseService: SupabaseService) {}

  create(createPromotionDto: CreatePromotionDto) {
    return createPromotionDto;
  }

  async findAll() {
    const { data, error } = await this.supabaseService.supabaseClient
      .from(this.promotionsTableName)
      .select();

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
