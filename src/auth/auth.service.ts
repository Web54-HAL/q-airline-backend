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

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
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
}
