import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class SearchFlightsDto {
  @IsEnum(['round_trip', 'one_way'], {
    message: 'Valid flight_type required',
  })
  @IsNotEmpty()
  flight_type: string;

  @IsString()
  @IsNotEmpty()
  start_pos: string;

  @IsString()
  end_pos: string;

  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @IsDateString()
  @IsOptional()
  end_date: string;

  @IsNumber()
  passenger_seat_count: number;
}
