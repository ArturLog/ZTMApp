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
  @Get('current')
  async getCurrentUser(@Req() request: RequestWithUser) {
    return request.user;
  }

  @Post('register')
  async register(@Body() registerData: RegisterDto) {
    return await this.authService.register(registerData);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginData: LoginDto) {
    const user = await this.userService.findByEmail(loginData.email);
    return {
      user_id: user.id,
      access_token: await this.authService.getJwtToken(user.id)
    }
    };
}
