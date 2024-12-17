import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  IsTimeZone,
  Min,
} from 'class-validator';

export class SearchFlightsDto {
  @IsString()
  @IsNotEmpty()
  from_pos: string;

  @IsString()
  @IsNotEmpty()
  to_pos: string;

  @IsDateString()
  @IsNotEmpty()
  date_start: string;

  @IsTimeZone()
  @IsNotEmpty()
  client_time_zone: string;

  @IsInt()
  @Min(1)
  passenger_seat_count: number;
}
