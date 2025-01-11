import { Module } from '@nestjs/common';
import { DepartureService } from './departure.service';
import { DepartureController } from './departure.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [DepartureService],
  controllers: [DepartureController]
})
export class DepartureModule {}
