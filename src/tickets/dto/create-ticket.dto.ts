import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTicketDto {
  @IsNumber()
  customer_id: number;

  @IsNumber()
  flight_id: number;

  @IsDateString()
  @IsNotEmpty()
  booking_date: string;

  @IsNumber()
  adult_count: number = 1;

  @IsNumber()
  children_count: number = 0;

  @IsNumber()
  infant_count: number = 0;
}
