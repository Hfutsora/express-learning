import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Commodity } from './Commodity';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @OneToMany(type => Commodity, commodity => commodity.supplier)
  commodities: Commodity[];
}
