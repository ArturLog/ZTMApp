import { LoginDto } from '../dto/login.dto';
import { Request } from 'express';

export interface RequestWithLogin extends Request {
  loginData: LoginDto;
}