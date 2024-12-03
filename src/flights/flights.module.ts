import { Module } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SupabaseModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        global: true,
        secret: process.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: '120s' },
      }),
    }),
  ],
  controllers: [FlightsController],
  providers: [FlightsService],
})
export class FlightsModule {}
