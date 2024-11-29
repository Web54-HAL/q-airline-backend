import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AppService {
  private supabaseClient: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_JWT_SECRET;
    this.supabaseClient = createClient(supabaseUrl, supabaseKey);
  }

  getHello(): string {
    return 'Hello World!';
  }

  getFlightsTable = () => {
    return this.supabaseClient.from("flights").select();;
  };

}
