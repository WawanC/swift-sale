import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const newProduct = await this.productsService.create({
      title: createProductDto.title,
      price: createProductDto.price,
      description: createProductDto.description,
    });

    return {
      message: 'Success',
      product: newProduct,
    };
  }
}
