import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { ProductParamDto } from './dto/product-param.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { UploadApiResponse } from 'cloudinary';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Post()
  @UseInterceptors(
    FilesInterceptor('pictures', undefined, {
      dest: path.join(__dirname, '..', '..', 'temp'),
    }),
  )
  async create(
    @UploadedFiles() pictures: Express.Multer.File[],
    @Body() createProductDto: CreateProductDto,
  ) {
    let picturesData: UploadApiResponse[] = [];
    if (pictures && pictures.length > 0) {
      picturesData = await this.productsService.storePictures(pictures);
    }

    const newProduct = await this.productsService.create({
      title: createProductDto.title,
      price: createProductDto.price,
      description: createProductDto.description,
      pictures: picturesData,
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

  @Put(':id')
  async update(
    @Param() params: ProductParamDto,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productsService.findOne(params.id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const updatedProduct = await this.productsService.update(product, {
      title: updateProductDto.title,
      price: updateProductDto.price,
      description: updateProductDto.description,
    });

    return {
      message: 'Success',
      product: updatedProduct,
    };
  }

  @Delete(':id')
  async delete(@Param() params: ProductParamDto) {
    const product = await this.productsService.findOne(params.id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const deletedProduct = await this.productsService.delete(product);

    return {
      message: 'Success',
      product: deletedProduct,
    };
  }
}
