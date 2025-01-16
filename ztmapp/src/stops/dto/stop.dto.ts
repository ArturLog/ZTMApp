import { IsString } from 'class-validator';

export class StopDto {
  public id: number;
  
  @IsString()
  public stopId: string;

  @IsString()
  public stopCode?: string;

  @IsString()
  public name?: string;

  @IsString()
  public zone?: string;

  @IsString()
  public type?: string;
}