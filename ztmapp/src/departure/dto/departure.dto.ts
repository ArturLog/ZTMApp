import { IsString } from 'class-validator';

export class DepartureDto {
  @IsString()
  public estimatedTime: string;

  @IsString()
  public minutesToDeparture: string;

  @IsString()
  public headSign: string;

  @IsString()
  public routeId: string;
}