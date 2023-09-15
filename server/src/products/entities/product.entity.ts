import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductPicture } from './product-picture.entity';
import { Cart } from '../../carts/cart.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  title: string;

  @Column('integer')
  price: number;

  @Column('text')
  description: string;

  @OneToMany(() => ProductPicture, (picture) => picture.product)
  pictures: ProductPicture[];

  @OneToMany(() => Cart, (cart) => cart.product)
  carts: Cart[];
}
