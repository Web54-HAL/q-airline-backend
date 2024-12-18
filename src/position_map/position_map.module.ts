import { Module } from '@nestjs/common';
import { PositionMapService } from './position_map.service';
import { PositionMapController } from './position_map.controller';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [PositionMapController],
  providers: [PositionMapService],
})
export class PositionMapModule {}
