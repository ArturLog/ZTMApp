import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Stop } from '../../stops/entities/stop.entity';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public vehicleId: string

  @Column({ nullable: true })
  public delayInSeconds?: number

  @Column({ nullable: true })
  public headSign?: string

  @Column({ nullable: true })
  public routeId?: number

  @Column({ nullable: true })
  public theoreticalTime?: string

  @Column({ nullable: true })
  public vehicleCode?: number

  @ManyToOne(() => Stop, (stop) => stop.vehicles)
  public stop?: Stop
}