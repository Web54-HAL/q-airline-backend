import { Test, TestingModule } from '@nestjs/testing';
import { SupabaseService } from './supabase.service';

describe('Supabase', () => {
  let provider: SupabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupabaseService],
    }).compile();

    provider = module.get<SupabaseService>(SupabaseService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
