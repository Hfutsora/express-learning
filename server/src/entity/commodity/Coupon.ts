import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Classification } from "./config";

@Entity()
export class Coupon {
  @Column()
  @PrimaryColumn()
  id: number;

  // @OneToMany(type => Classification, classification => classification)
  // used: Classification[];

  @Column()
  @IsNotEmpty()
  discount: number;
}