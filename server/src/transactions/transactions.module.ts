import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionItem } from './entities/transaction-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, TransactionItem])],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
