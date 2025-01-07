import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { RequestWithLogin } from './interfaces/requestWithLogin';
import { RequestWithUser } from './interfaces/requestWithUser';
import { response } from 'express';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerData: RegisterDto) {
    return await this.authService.register(registerData);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Req() request: RequestWithLogin){
    const loginData = request.body;
    const cookie = await this.authService.login(loginData);
    request.res.setHeader('Set-Cookie', cookie);
    return loginData;
  }

  @Post('logout')
  async logout(@Req() request: RequestWithUser) {
    request.res.setHeader('Set-Cookie', await this.authService.logout());
    request.res.sendStatus(200);
  }
}

