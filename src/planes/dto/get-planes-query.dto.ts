import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class GetAllPlanesQueryDto {
  @IsInt()
  @Min(0)
  @IsOptional()
  plane_id: number;

  @IsString()
  @IsOptional()
  manufacturer: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  customer_seat_count: number;
}
