import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { Classification } from "./config";

@Entity()
export class Coupon {
  @Column()
  @PrimaryColumn()
  id: number;

  @Column()
  used: Classification[];

  @Column()
  @IsNotEmpty()
  discount: number;
}