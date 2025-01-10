import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { StopsService } from './stops.service';
import { Stop } from './entities/stop.entity';

@ApiBearerAuth('access-token')
@Controller('stops')
export class StopsController {
  constructor(private stopsService: StopsService) {}

  @Get()
  async getAll() : Promise<Stop[]> {
    return this.stopsService.getAll();
  }

}
