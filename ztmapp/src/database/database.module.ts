import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Stop } from '../stops/entities/stop.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'ztmDB',
      entities: [User, Stop, Vehicle],
      synchronize: true,
    })
  ]
})
export class DatabaseModule {}