import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductPicture } from './entities/product-picture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductPicture])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
