import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { User } from '../users/user.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
  ) {}

  async create(data: { user: User; product: Product; count: number }) {
    const newCart = this.cartRepository.create({
      count: data.count,
      price: data.product.price,
    });
    newCart.user = data.user;
    newCart.product = data.product;
    return await this.cartRepository.save(newCart);
  }

  async increment(cart: Cart, count: number) {
    cart.count += count;
    return await this.cartRepository.save(cart);
  }

  async findOnebyUserAndProduct(user: User, product: Product) {
    return await this.cartRepository.findOne({
      where: {
        user: user,
        product: product,
      },
    });
  }
}
