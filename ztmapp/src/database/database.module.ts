import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Stop } from '../stops/entities/stop.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'ztmDB',
      entities: [User, Stop],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
