import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TemporaryCommodity } from "../commodity/Commodity";
import { User } from "./User";

@Entity()
export class ShoppingCart {
  @Column()
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // items: { commodity: TemporaryCommodity; count: number; }[]
}