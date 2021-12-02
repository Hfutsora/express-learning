import { IsNotEmpty, Length } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToOne, JoinColumn, ManyToOne, CreateDateColumn } from "typeorm";
import { Supplier } from "./Supplier";
import { User } from "../user/User";
import { Classification } from "./config";

@Entity()
export class Commodity {
  @PrimaryGeneratedColumn()
  id: string;

  @PrimaryColumn()
  @Length(1, 30)
  name: string;

  @Column()
  stock: number;

  @Column()
  @IsNotEmpty()
  classification: Classification;

  @Column("double")
  @IsNotEmpty()
  price: number;

  @OneToOne(type => Supplier, supplier => supplier.commodities)
  @JoinColumn()
  supplier: Supplier;
}

@Entity()
export class TemporaryCommodity extends Commodity {
  // @OneToOne(type => User)
  // owner: User;

  @Column()
  @CreateDateColumn()
  createdAt: Date;
}
