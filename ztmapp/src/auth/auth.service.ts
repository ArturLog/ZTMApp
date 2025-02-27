import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { Logger } from '@nestjs/common';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  public async register(registerData: RegisterDto) {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(registerData.password, salt);

    try {
      return await this.usersService.create({
        ...registerData,
        password: hashedPassword,
      });
    } catch (e) {
      if (e.code === 'SQLITE_CONSTRAINT' && e.message.includes('UNIQUE')) {
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async login(loginData: LoginDto) {
    try {
      const user = await this.usersService.findByEmail(loginData.email);
      await this.verifyPassword(loginData.password, user.password);
      const payload = { sub: user.id };
      const token = await this.jwtService.signAsync(payload);
      return `Authentication=${token}; HttpOnly; Path=/; Max-Age=900`;
    } catch (e) {
      this.logger.error(e);
      throw new UnauthorizedException();
    }
  }

  public async getJwtToken(userId: number) {
    const payload = { userId };
    return this.jwtService.sign(payload);
  }

  public async validateUser(email: string, password: string): Promise<User> {
    try {
      const user = await this.usersService.findByEmail(email);
      await this.verifyPassword(password, user.password);
      return user;
    } catch (e) {
      this.logger.error(`Invalid Credentials \n${e}`);
      throw new HttpException('Invalid Credentials', HttpStatus.BAD_REQUEST);
    }
  }

  public async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );

    if (!isPasswordMatching) {
      throw new HttpException('Invalid Credentials', HttpStatus.BAD_REQUEST);
    }
  }

  public async logout() {
    return 'Authentication=; HttpOnly; Path=/; Max-Age=0';
  }
}
