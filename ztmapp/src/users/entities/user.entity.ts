import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from './role.enum';
import { Stop } from '../../stops/entities/stop.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  @Exclude()
  public password: string;

  @Column({ default: Role.USER })
  public role?: Role;

  @ManyToMany(() => Stop, (stop) => stop.users)
  @JoinTable()
  public stops?: Stop[];
}
