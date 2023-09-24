import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UnauthorizedException,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { ProductParamDto } from './dto/product-param.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ValidPictures } from './decorators/valid-pictures.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';
import { UsersService } from '../users/users.service';
import { ProductsQueryDto } from './dto/products-query.dto';

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private usersService: UsersService,
  ) {}
  @UseGuards(AuthGuard)
  @Post()
  @ValidPictures()
  async create(
    @UploadedFiles()
    pictures: Express.Multer.File[],
    @Body() createProductDto: CreateProductDto,
    @Req() request: Request,
  ) {
    if (!request.user) throw new UnauthorizedException();

    const user = await this.usersService.findOneById(request.user.userId);

    if (!user) throw new UnauthorizedException();

    const newProduct = await this.productsService.create({
      title: createProductDto.title,
      price: createProductDto.price,
      description: createProductDto.description,
      pictures: pictures,
      user: user,
    });

    return {
      message: 'Success',
      product: newProduct,
    };
  }

  @Get()
  async findAll(@Query() query: ProductsQueryDto) {
    const products = await this.productsService.findAll({
      search: query.search,
    });

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
    @Req() request: Request,
  ) {
    if (!request.user) throw new UnauthorizedException();

    const product = await this.productsService.findOne(params.id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.user.id !== request.user.userId)
      throw new UnauthorizedException();

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
  async delete(@Param() params: ProductParamDto, @Req() request: Request) {
    if (!request.user) throw new UnauthorizedException();

    const product = await this.productsService.findOne(params.id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.user.id !== request.user.userId)
      throw new UnauthorizedException();

    const deletedProduct = await this.productsService.delete(product);

    return {
      message: 'Success',
      product: deletedProduct,
    };
  }
}
