import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateFlightDto {
  @IsNumber()
  @Min(1)
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
  @IsNotEmpty()
  end_pos: string;

  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @IsDateString()
  @IsOptional()
  end_date: string;
}
