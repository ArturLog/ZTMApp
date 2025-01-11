import { Module } from '@nestjs/common';
import { DepartureService } from './departure.service';
import { DepartureController } from './departure.controller';

@Module({
  providers: [DepartureService],
  controllers: [DepartureController]
})
export class DepartureModule {}
