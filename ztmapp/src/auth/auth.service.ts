import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from "bcrypt";
import { LoginDto } from './dto/login.dto';
import { Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  private readonly logger = new Logger(AuthService.name);

  public async register(registerData: RegisterDto){
    const salt = 10;
    const hashedPassword = await bcrypt.hash(registerData.password, salt);

    try{
      return await this.usersService.create({
        ...registerData,
        password: hashedPassword
      })
    }catch (e) {
      if (e.code === 'SQLITE_CONSTRAINT' && e.message.includes('UNIQUE')) {
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(loginData: LoginDto) {
    try {
      const user = await this.usersService.findByEmail(loginData.email);
      await this.verifyPassword(loginData.password, user.password)
      const payload = { sub: user.id };
      return {
        access_token: await this.jwtService.signAsync(payload)
      }
    } catch (e){
      this.logger.error(e);
      throw new UnauthorizedException();
    }
  }

  async verifyPassword(plainTextPassword: string, hashedPassword: string){
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword
    );

    if (!isPasswordMatching) {
      throw new HttpException("Invalid Credentials", HttpStatus.BAD_REQUEST);
    }
  }
}
