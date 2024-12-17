import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class GetAllFlightsQueryDto {
  @IsInt()
  @Min(1)
  @IsOptional()
  flight_id: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  plane_id: number;

  @IsString()
  @IsOptional()
  from_pos: string;

  @IsString()
  @IsOptional()
  to_pos: string;

  @IsDateString()
  @IsOptional()
  time_start: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  duration_minute: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  total_passengers: number;
}
