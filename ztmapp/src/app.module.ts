import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { StopsModule } from './stops/stops.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { DatabaseModule } from './database/database.module';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    UsersModule,
    AuthModule,
    StopsModule,
    VehiclesModule,
    DatabaseModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
