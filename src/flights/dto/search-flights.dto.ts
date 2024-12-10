import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
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
  time_start: string;

  @IsInt()
  @Min(1)
  passenger_seat_count: number;
}
