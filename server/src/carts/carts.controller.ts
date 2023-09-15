import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CartProductParamDto } from './dto/cart-product-param.dto';
import { CreateCartDto } from './dto/create-cart.dto';
import { AuthGuard } from '../auth/auth.guard';
import { CartsService } from './carts.service';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { Request } from 'express';

@Controller('carts')
export class CartsController {
  constructor(
    private cartsService: CartsService,
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}
  @UseGuards(AuthGuard)
  @Post(':productId')
  async create(
    @Param() params: CartProductParamDto,
    @Body() createCartDto: CreateCartDto,
    @Req() request: Request,
  ) {
    if (!request.user) throw new UnauthorizedException();

    const user = await this.usersService.findOneById(request.user.userId);
    if (!user) throw new UnauthorizedException();

    const product = await this.productsService.findOne(params.productId);
    if (!product) throw new NotFoundException('Product not found');

    const existingCart = await this.cartsService.findOnebyUserAndProduct(
      user,
      product,
    );

    let cart;

    if (existingCart) {
      cart = await this.cartsService.increment(
        existingCart,
        createCartDto.count,
      );
    } else {
      cart = await this.cartsService.create({
        user: user,
        product: product,
        count: createCartDto.count,
      });
    }

    return {
      message: 'Success',
      cart: cart,
    };
  }
}
