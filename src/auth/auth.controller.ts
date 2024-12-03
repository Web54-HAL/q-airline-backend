import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PublicEndpoint } from 'src/decorators/PublicEndpoint';
import { SignInDto } from './dto/sign-in.dto';
import { CustomerRegisterDto } from './dto/customer-register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @PublicEndpoint()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body(ValidationPipe) signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @PublicEndpoint()
  @Post('register')
  async customerRegister(
    @Body(ValidationPipe) customerRegisterDto: CustomerRegisterDto,
  ) {
    return await this.authService.customerSignUp(customerRegisterDto);
  }

  @Get('profile')
  getProfile(@Request() request) {
    return request.user;
  }
}
