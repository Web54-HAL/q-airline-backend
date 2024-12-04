import { Module } from '@nestjs/common';
import { PlanesService } from './planes.service';
import { PlanesController } from './planes.controller';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [PlanesController],
  providers: [PlanesService],
})
export class PlanesModule {}
