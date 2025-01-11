import { IsString } from 'class-validator';

export class StopDto {
  @IsString()
  public id: string;

  @IsString()
  public stopCode?: string;

  @IsString()
  public name?: string;

  @IsString()
  public zone?: string;

  @IsString()
  public type?: string;
}