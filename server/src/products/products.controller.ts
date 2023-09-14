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
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { ProductParamDto } from './dto/product-param.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ValidPictures } from './decorators/valid-pictures.decorator';
import { AuthGuard } from '../auth/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @UseGuards(AuthGuard)
  @Post()
  @ValidPictures()
  async create(
    @UploadedFiles()
    pictures: Express.Multer.File[],
    @Body() createProductDto: CreateProductDto,
  ) {
    const newProduct = await this.productsService.create({
      title: createProductDto.title,
      price: createProductDto.price,
      description: createProductDto.description,
      pictures: pictures,
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

  @UseGuards(AuthGuard)
  @Put(':id')
  @ValidPictures()
  async update(
    @Param() params: ProductParamDto,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles()
    pictures: Express.Multer.File[],
  ) {
    const product = await this.productsService.findOne(params.id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const updatedProduct = await this.productsService.update(product, {
      title: updateProductDto.title,
      price: updateProductDto.price,
      description: updateProductDto.description,
      pictures: pictures,
    });

    return {
      message: 'Success',
      product: updatedProduct,
    };
  }

  @UseGuards(AuthGuard)
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
