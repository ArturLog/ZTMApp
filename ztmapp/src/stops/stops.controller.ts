import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { StopsService } from './stops.service';
import { Stop } from './entities/stop.entity';
import { StopDto } from './dto/stop.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth('access-token')
@Controller('stops')
export class StopsController {
  constructor(private stopsService: StopsService) {}

  @Get()
  async getAll() : Promise<Stop[]> {
    return await this.stopsService.getAll();
  }

  @Get('active')
  async getAllActive() : Promise<StopDto[]> {
    const stops = await this.stopsService.getAll();

    const filteredStops = stops.filter((stop) => stop.name && stop.name.trim() !== '');

    return filteredStops.map((stop) => ({
      id: stop.id,
      stopId: stop.stopId.toString(),
      name: stop.name,
      stopCode: stop.stopCode || '0',
      zone: stop.zone || 'No zone',
      type: stop.type || ' ',
    }));
  }

  @Get('init')
  async init() : Promise<{ message: string }> {
    await this.stopsService.init();
    return { message: 'Stops initialized successfully' };
  }

}
