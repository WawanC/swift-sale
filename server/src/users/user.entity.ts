import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from '../carts/cart.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  username: string;

  @Column('varchar')
  password: string;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];
}
