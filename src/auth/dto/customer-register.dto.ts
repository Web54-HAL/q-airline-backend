import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Gender } from 'src/enums/Gender';

export class CustomerRegisterDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  family_name: string;

  @IsString()
  @IsNotEmpty()
  given_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone_num: string;

  @IsDateString()
  @IsNotEmpty()
  date_of_birth: string;

  @IsEnum(Gender)
  gender: string;
}
