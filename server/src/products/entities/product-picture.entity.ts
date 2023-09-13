import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'product_pictures' })
export class ProductPicture {
  @PrimaryColumn('varchar')
  public_id: string;

  @Column('varchar')
  url: string;

  @ManyToOne(() => Product, (product) => product.pictures, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
