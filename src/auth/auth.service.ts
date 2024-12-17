import {
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
import * as bcrypt from 'bcrypt';
import { normalizePhoneNumber } from 'src/utilities/phonenumber.normalizer';

@Injectable()
export class AuthService {
  private readonly saltRounds: number;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    this.saltRounds = +process.env.BCRYPT_SALT_ROUNDS;
  }

  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    const { username, password } = signInDto;

    const usernameIsEmail = this.isEmail(username);

    const inputPhoneNumObj = { phoneNum: username };
    const usernameIsPhoneNumber = this.isPhoneNumber(inputPhoneNumObj);

    if (!usernameIsEmail && !usernameIsPhoneNumber) {
      throw new UnauthorizedException('Invalid email or phone number');
    }

    const user = usernameIsEmail
      ? await this.usersService.findUserByEmail(username)
      : await this.usersService.findUserByPhoneNumber(
          inputPhoneNumObj.phoneNum,
        );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
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
    await this.usersService.checkingCustomerExistedInDatabase(
      customerRegisterDto.email,
      customerRegisterDto.phone_num,
    );

    const hashedPassword = await bcrypt.hash(
      customerRegisterDto.password,
      this.saltRounds,
    );
    customerRegisterDto.password = hashedPassword;

    const data =
      await this.usersService.insertNewCustomerIntoDatabase(
        customerRegisterDto,
      );

    // Make sure to exclude hashed password out of response.
    delete data[0].password;

    return data;
  }

  private isEmail(inputEmail: string): boolean {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(inputEmail);
  }

  private isPhoneNumber(input: { phoneNum: string }): boolean {
    const normalizedPhoneNum = normalizePhoneNumber(input.phoneNum);

    if (!normalizedPhoneNum) return false;

    input.phoneNum = normalizedPhoneNum;
    return true;
  }
}
