import { IsDateString, IsInt, IsOptional, Min } from 'class-validator';

export class GetAllTicketsQueryDto {
  @IsInt()
  @Min(0)
  @IsOptional()
  customer_id: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  flight_id: number;

  @IsDateString()
  @IsOptional()
  booking_date: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  adult_count: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  children_count: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  infant_count: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  total_passengers: number;
}
