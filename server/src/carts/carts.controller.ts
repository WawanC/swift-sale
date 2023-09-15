import {
  Body,
  Controller,
  Delete,
  Get,
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
import { DeleteCartDto } from './dto/delete-cart.dto';

@Controller('carts')
export class CartsController {
  constructor(
    private cartsService: CartsService,
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}

  async checkUserProduct(userId: string, productId: string) {
    const user = await this.usersService.findOneById(userId);
    if (!user) throw new UnauthorizedException();

    const product = await this.productsService.findOne(productId);
    if (!product) throw new NotFoundException('Product not found');

    return { user, product };
  }

  @UseGuards(AuthGuard)
  @Post(':productId')
  async create(
    @Param() params: CartProductParamDto,
    @Body() createCartDto: CreateCartDto,
    @Req() request: Request,
  ) {
    if (!request.user) throw new UnauthorizedException();

    const { user, product } = await this.checkUserProduct(
      request.user.userId,
      params.productId,
    );

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

  @UseGuards(AuthGuard)
  @Delete(':productId')
  async delete(
    @Param() params: CartProductParamDto,
    @Body() deleteCartDto: DeleteCartDto,
    @Req() request: Request,
  ) {
    if (!request.user) throw new UnauthorizedException();

    const { user, product } = await this.checkUserProduct(
      request.user.userId,
      params.productId,
    );

    let cart = await this.cartsService.findOnebyUserAndProduct(user, product);
    if (!cart) throw new NotFoundException('Cart not found');

    if (deleteCartDto.count) {
      cart = await this.cartsService.decrement(cart, deleteCartDto.count);
    } else {
      cart = await this.cartsService.delete(cart);
    }

    return { message: 'Success', cart: cart };
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Req() request: Request) {
    if (!request.user) throw new UnauthorizedException();

    const user = await this.usersService.findOneById(request.user.userId);

    if (!user) throw new UnauthorizedException();

    const carts = await this.cartsService.findByUser(user);

    return {
      message: 'Success',
      carts: carts,
    };
  }
}
