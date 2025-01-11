import { Controller, Get, Param } from '@nestjs/common';
import { DepartureService } from './departure.service';
import { DepartureDto } from './dto/departure.dto';

@Controller('departures')
export class DepartureController {
  constructor(
    private readonly departureService: DepartureService
  ) {}

  @Get(':id')
  async getDeparturesByStopId(@Param('id') id: number) : Promise<DepartureDto> {
    return await this.departureService.getDeparturesByStopId(id);
  }
}
