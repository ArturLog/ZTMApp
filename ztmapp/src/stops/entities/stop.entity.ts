import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Stop {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public stopId: number;

  @Column({ nullable: true })
  public stopCode?: string;

  @Column({ nullable: true })
  public name?: string;

  @Column({ nullable: true })
  public description?: string;

  @Column({ nullable: true })
  public zone?: string;

  @Column({ nullable: true })
  public type?: string;

  @ManyToMany(() => User, (user) => user.stops)
  public users?: User[];
}
