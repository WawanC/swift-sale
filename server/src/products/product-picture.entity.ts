import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'product_pictures' })
export class ProductPicture {
  @PrimaryColumn('varchar')
  public_id: string;

  @Column('varchar')
  url: string;

  @ManyToOne(() => Product, (product) => product.pictures)
  product: Product;
}
