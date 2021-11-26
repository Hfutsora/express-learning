import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Coupon } from '../commodity/Coupon';
import { TemporaryCommodity } from '../commodity/Index';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  items: { commodity: TemporaryCommodity; count: number; }[];

  @Column()
  coupons: Coupon[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
