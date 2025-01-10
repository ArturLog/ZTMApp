import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stop } from './entities/stop.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StopsService {
  constructor(
    @InjectRepository(Stop)
    private stopsRepository: Repository<Stop>,
  ) {}

  async getAll() : Promise<Stop[]>{
    return await this.stopsRepository.find();
  }
}
