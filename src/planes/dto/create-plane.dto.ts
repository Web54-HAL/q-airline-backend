import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreatePlaneDto {
  @IsString()
  @IsNotEmpty()
  manufacturer: string;

  @IsInt()
  @Min(1)
  customer_seat_count: number;
}
