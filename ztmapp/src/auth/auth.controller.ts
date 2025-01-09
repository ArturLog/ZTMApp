import {
  Body,
  Controller, Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { RequestWithUser } from './interfaces/requestWithUser';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() request: RequestWithUser) {
    return request.user;
  }

  @Post('register')
  async register(@Body() registerData: RegisterDto) {
    return await this.authService.register(registerData);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginData: LoginDto, @Res() res: Response) {
    const user = await this.userService.findByEmail(loginData.email);
    const cookie = await this.authService.getCookieWithJwtToken(user.id);
    res.setHeader('Set-Cookie', cookie);
    res.status(HttpStatus.OK).send(user);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() request: RequestWithUser) {
    request.res.setHeader('Set-Cookie', await this.authService.logout());
    request.res.sendStatus(200);
  }
}
