import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { ProductParamDto } from './dto/product-param.dto';

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

  @Get()
  async findAll() {
    const products = await this.productsService.findAll();

    return {
      message: 'Success',
      products: products,
    };
  }

  @Get(':id')
  async findOne(@Param() params: ProductParamDto) {
    const product = await this.productsService.findOne(params.id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return {
      message: 'Success',
      product: product,
    };
  }
}
