import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { Length, IsNotEmpty, IsEmail } from "class-validator";
import * as bcrypt from "bcryptjs";
import { Order } from "./Order";
import { ShoppingCart } from "./ShoppingCart";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @Length(4, 100)
  name: string; 

  @Column()
  @Length(4, 100)
  password: string;

  @Column()
  age: number;

  @Column()
  @IsNotEmpty()
  role: string;

  @OneToOne(type => ShoppingCart)
  @JoinColumn()
  shoppingCart: ShoppingCart;

  @OneToOne(type => Order)
  @JoinColumn()
  order: Order[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  hashPassword = async (): Promise<void> => {
    this.password = bcrypt.hashSync(this.password, 10);
  };

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string): boolean {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
