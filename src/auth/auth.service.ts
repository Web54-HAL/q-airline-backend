import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { UserRole } from 'src/enums/UserRole';
import { SignedInUserDto } from './dto/signed-in-user.dto';
import { CustomerRegisterDto } from './dto/customer-register.dto';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class AuthService {
  private readonly customerTableName = 'customers';

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    const { username, password } = signInDto;

    const usernameIsEmail = this.isEmail(username);
    const usernameIsPhoneNumber = this.isPhoneNumber(username);

    if (!usernameIsEmail && !usernameIsPhoneNumber) {
      throw new UnauthorizedException('Invalid email or phone number');
    }

    const user = usernameIsEmail
      ? await this.usersService.findUserByEmail(username)
      : await this.usersService.findUserByPhoneNumber(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Wrong password');
    }

    const payload: SignedInUserDto = {
      userId: user.id,
      role: UserRole[user.role],
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async customerSignUp(customerRegisterDto: CustomerRegisterDto) {
    await this.checkingCustomerExisted(
      customerRegisterDto.email,
      customerRegisterDto.phone_num,
    );

    const { data, error } = await this.supabaseService.supabaseClient
      .from(this.customerTableName)
      .insert(customerRegisterDto)
      .select();

    if (error) throw new BadRequestException(error);

    return data;
  }

  private isEmail(inputEmail: string): boolean {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(inputEmail);
  }

  private isPhoneNumber(inputPhoneNum: string): boolean {
    // Following Regex for Vietnamese phone number.
    const phoneNumRegex =
      /(?:\+?84|0084|0)[235789][0-9]{1,2}[0-9]{7}(?:[^\d]+|$)/;
    return phoneNumRegex.test(inputPhoneNum);
  }

  private async checkingCustomerExisted(
    inputEmail: string,
    inputPhoneNum: string,
  ): Promise<void> {
    let data: any;

    ({ data } = await this.supabaseService.supabaseClient
      .from(this.customerTableName)
      .select()
      .eq('email', inputEmail));

    if (data.length !== 0)
      throw new BadRequestException(
        'An account already registered with this email',
      );

    ({ data } = await this.supabaseService.supabaseClient
      .from(this.customerTableName)
      .select()
      .eq('phone_num', inputPhoneNum));

    if (data.length !== 0)
      throw new BadRequestException(
        'An account already registered with this phone number',
      );
  }
}
