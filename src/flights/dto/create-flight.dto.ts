import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateFlightDto {
  @IsNumber()
  plane_id: number;

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
  end_date: string;
}
