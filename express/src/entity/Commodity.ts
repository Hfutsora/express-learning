import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import { Supplier } from "./Supplier";

@Entity()
export class Commodity {
  @PrimaryGeneratedColumn()
  id: string;

  @PrimaryColumn()
  name: string;

  @Column()
  stock: number;

  @Column("double")
  price: number;

  @OneToOne(type => Supplier, supplier => supplier.commodities)
  @JoinColumn()
  supplier: Supplier;
}
