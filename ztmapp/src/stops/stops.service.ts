import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stop } from './entities/stop.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';

@Injectable()
export class StopsService {
  constructor(
    @InjectRepository(Stop)
    private stopsRepository: Repository<Stop>,
    private configService: ConfigService,
  ) {}

  async getAll() : Promise<Stop[]>{
    return await this.stopsRepository.find();
  }

  async findById(id: number) : Promise<Stop> {
    return await this.stopsRepository.findOneBy({ id })
  }

  async init(): Promise<void> {
    try {
      const response = await fetch(this.configService.get('STOPS_API'));
      if (!response.ok) {
        throw new HttpException(
          `Failed to fetch data from ${this.configService.get('STOPS_API')}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const data = await response.json();

      const today = new Date().toISOString().split('T')[0];

      if (!data[today]) {
        throw new HttpException(
          `No data available for today's date: ${today}`,
          HttpStatus.NOT_FOUND,
        );
      }

      const todayStops = data[today].stops;

      const stopsToSave = todayStops.map((stop: any) => {
        return this.stopsRepository.create({
          stopId: stop.stopId,
          name: stop.stopName,
          description: stop.stopDesc,
          stopCode: stop.stopCode,
          zone: stop.zoneName,
          type: stop.type
        });
      });

      await this.stopsRepository.save(stopsToSave);

      console.log(`Successfully saved ${stopsToSave.length} stops.`);
    } catch (error) {
      console.error('Error in init method:', error);
      throw new HttpException(
        'Failed to initialize stops',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
