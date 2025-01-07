import {
  IsEmail,
  IsString,
  IsNotEmpty,
  Length,
  IsOptional,
} from "class-validator";

export class UpdateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(8, 24)
  password: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  role?: any;
}