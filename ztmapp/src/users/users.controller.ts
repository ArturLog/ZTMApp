import {
  Body,
  Controller,
  Delete,
  Get, HttpException, HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Stop } from '../stops/entities/stop.entity';
import { StopsService } from '../stops/stops.service';

@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private stopsService: StopsService,
  ) {}

  //@UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  //@UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.usersService.findUserByIdWithStops(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() userData: UpdateUserDto) {
    await this.usersService.update(id, userData);
    return this.usersService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.usersService.delete(id);
  }

  //@UseGuards(JwtAuthGuard)
  @Get(':id/stops')
  async getStops(@Param('id') id: number): Promise<Stop[]> {
    return this.usersService.getStops(id);
  }

  //@UseGuards(JwtAuthGuard)
  @Post(':userId/stops/:stopId')
  async addStopToUser(
    @Param('userId') userId: number,
    @Param('stopId') stopId: number,
  ) {
    const user = await this.usersService.findUserByIdWithStops(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const stop = await this.stopsService.findById(stopId);
    if (!stop) {
      throw new HttpException('Stop not found', HttpStatus.NOT_FOUND);
    }

    return this.usersService.addStopToUser(user, stop);
  }

  //@UseGuards(JwtAuthGuard)
  @Delete(':userId/stops/:stopId')
  async removeStopFromUser(
    @Param('userId') userId: number,
    @Param('stopId') stopId: number,
  ) {
    const user = await this.usersService.findUserByIdWithStops(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const stop = await this.stopsService.findById(stopId);
    if (!stop) {
      throw new HttpException('Stop not found', HttpStatus.NOT_FOUND);
    }

    return this.usersService.removeStopFromUser(user, stop);
  }
}
