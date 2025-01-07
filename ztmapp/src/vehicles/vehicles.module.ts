import { Module } from '@nestjs/common';
import { ServicesModule } from './services.module';
import { ControllersModule } from './controllers.module';

@Module({
  imports: [ServicesModule, ControllersModule]
})
export class VehiclesModule {}
