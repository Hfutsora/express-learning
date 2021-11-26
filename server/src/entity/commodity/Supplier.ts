import { IsPhoneNumber } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Commodity } from './Index';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  @IsPhoneNumber('CN')
  phone: string;

  @OneToMany(type => Commodity, commodity => commodity.supplier)
  commodities: Commodity[];
}
