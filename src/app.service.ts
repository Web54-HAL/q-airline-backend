import { Injectable } from '@nestjs/common';
import { SupabaseService } from './supabase/supabase.service';

@Injectable()
export class AppService {
  constructor(private readonly supabaseService: SupabaseService) {}

  getHello(): string {
    return 'Hello World!';
  }

  getFlightsTable = () => {
    return this.supabaseService.supabaseClient.from('flights').select();
  };
}
