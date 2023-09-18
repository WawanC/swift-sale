import {
  BadRequestException,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';
import { CartsService } from '../carts/carts.service';
import { UsersService } from '../users/users.service';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private transactionsService: TransactionsService,
    private cartsService: CartsService,
    private usersService: UsersService,
  ) {}
  @UseGuards(AuthGuard)
  @Post()
  async create(@Req() request: Request) {
    if (!request.user) throw new UnauthorizedException();

    const user = await this.usersService.findOneById(request.user.userId);

    if (!user) throw new UnauthorizedException();

    const carts = await this.cartsService.findByUser(user);

    if (carts.length <= 0) throw new BadRequestException('Users cart is empty');

    const newTransaction = await this.transactionsService.create({
      carts: carts,
      user: user,
    });

    await this.cartsService.clear(user);

    return {
      message: 'Success',
      transaction: newTransaction,
    };
  }
}
