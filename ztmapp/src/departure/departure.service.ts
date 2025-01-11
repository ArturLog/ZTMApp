import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DepartureDto } from './dto/departure.dto';
import { ConfigService } from '@nestjs/config';
import { IsString } from 'class-validator';
import { resolveAny } from 'node:dns';

@Injectable()
export class DepartureService {
constructor(
  private readonly configService: ConfigService
) {}
  async getDeparturesByStopId(id : number) {
    try {
      const response = await fetch(this.configService.get('DEPARTURE_API_WITHOUT_ID') + id.toString());
      if (!response.ok) {
        throw new HttpException(
          `Failed to fetch data from ${this.configService.get('DEPARTURE_API_WITHOUT_ID') + id.toString()}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      let data: any;
      let departures: any
      try{
        data = await response.json();
        departures = data.delay;
      }catch(e){
        console.log(`Not found departures for stop ${id}`)
        return [];
      }

      return departures.map((departure: any) => {
        return {
          estimatedTime: departure.estimatedTime,
          minutesToDeparture: this.calculateMinutesToDeparture(departure.estimatedTime),
          headSign: departure.headsign,
          routeId: departure.routeId.toString(),
        }
      })
    } catch (error) {
      console.error('Error in departure fetch method:', error);
      throw new HttpException(
        'Failed to fetch departures',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  calculateMinutesToDeparture(departureTime: string): string {
    const now = new Date();
    const [targetHours, targetMinutes] = departureTime.split(":").map(Number);

    if(now.getHours() > targetHours || (now.getHours() === targetHours && now.getMinutes() > targetMinutes)){
      return "now"
    }
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const targetTotalMinutes = targetHours * 60 + targetMinutes;

    let minutesDifference = targetTotalMinutes - currentMinutes;

    if (minutesDifference < 0) {
      minutesDifference += 24 * 60;
    }

    return minutesDifference.toString();
  }
}
