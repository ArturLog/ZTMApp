import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id })
  }

  async findByName(name: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ name })
  }

  async create(userData: CreateUserDto) : Promise<User | null> {
    const newUser = this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async update(id: number, userData: UpdateUserDto) {
   try{
     if (userData.password){
       userData.password = await bcrypt.hash(userData.password, 10);
     }
     await this.usersRepository.update(id, userData);
   }catch (e){
     throw new HttpException(e, HttpStatus.BAD_REQUEST);
   }
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }
}

