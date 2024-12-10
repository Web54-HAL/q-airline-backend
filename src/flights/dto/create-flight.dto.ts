import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateFlightDto {
  @IsNumber()
  @Min(1)
  plane_id: number;

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
  duration_minute: number;
}
