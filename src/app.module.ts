import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FlightsModule } from './flights/flights.module';
import { SupabaseModule } from './supabase/supabase.module';
import { TicketsModule } from './tickets/tickets.module';
import { PlanesModule } from './planes/planes.module';
import { PromotionsModule } from './promotions/promotions.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { PositionMapModule } from './position_map/position_map.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    FlightsModule,
    SupabaseModule,
    TicketsModule,
    PlanesModule,
    PromotionsModule,
    ThrottlerModule.forRoot([
      {
        ttl: 1000,
        limit: 70,
      },
    ]),
    PositionMapModule,
    CacheModule.registerAsync({
      useFactory: () => ({
        ttl: 300, // Seconds
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
