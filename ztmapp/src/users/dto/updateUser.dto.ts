import {
  IsEmail,
  IsString,
  IsNotEmpty,
  Length,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(8, 24)
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  role?: any;
}
