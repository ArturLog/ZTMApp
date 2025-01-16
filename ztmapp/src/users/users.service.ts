import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import * as bcrypt from 'bcrypt';
import { Stop } from '../stops/entities/stop.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async create(userData: CreateUserDto): Promise<User | null> {
    const newUser = this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async update(id: number, userData: UpdateUserDto) {
    try {
      const user = await this.usersRepository.findOneBy({ id });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const password = await bcrypt.hash(userData.password, 10);
      userData.password = password;
      const updatedUser = Object.assign(user, userData);
      return await this.usersRepository.save(updatedUser);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }

  async getStops(userId: number): Promise<Stop[]>{
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['stops'],
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user.stops || [];
  }

  async findUserByIdWithStops(id: number): Promise<User> {
    return await this.usersRepository.findOne({
      where: { id: id },
      relations: ['stops'],
    });
  }


  async addStopToUser(user: User, stop: Stop): Promise<User> {
    if (!user.stops) {
      user.stops = [];
    }

    if (user.stops.some((existingStop) => existingStop.id === stop.id)) {
      throw new HttpException(
        'Stop is already associated with the user',
        HttpStatus.BAD_REQUEST,
      );
    }

    user.stops.push(stop);
    return this.usersRepository.save(user);
  }

  async removeStopFromUser(user: User, stop: Stop): Promise<User> {
    if (!user.stops || !user.stops.some((existingStop) => existingStop.id === stop.id)) {
      throw new HttpException(
        'Stop is not associated with the user',
        HttpStatus.BAD_REQUEST,
      );
    }

    user.stops = user.stops.filter((existingStop) => existingStop.id !== stop.id);
    return this.usersRepository.save(user);
  }
}
