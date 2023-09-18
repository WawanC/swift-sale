import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { TransactionItem } from './entities/transaction-item.entity';
import { Cart } from '../carts/cart.entity';
import { User } from '../users/user.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(TransactionItem)
    private transactionItemRepository: Repository<TransactionItem>,
  ) {}

  async create(data: { carts: Cart[]; user: User }) {
    const newTransaction = await this.transactionRepository.save(
      this.transactionRepository.create({
        user: data.user,
        createdAt: new Date().toISOString(),
      }),
    );

    for (const cart of data.carts) {
      const newTransactionItem = this.transactionItemRepository.create({
        productTitle: cart.product.title,
        count: cart.count,
        price: cart.price,
        transaction: newTransaction,
      });
      await this.transactionItemRepository.save(newTransactionItem);
    }

    return newTransaction;
  }
}
