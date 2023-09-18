import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'process';
import { Product } from './products/entities/product.entity';
import { ProductsModule } from './products/products.module';
import { ProductPicture } from './products/entities/product-picture.entity';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { CartsModule } from './carts/carts.module';
import { Cart } from './carts/cart.entity';
import { TransactionsModule } from './transactions/transactions.module';
import { Transaction } from './transactions/entities/transaction.entity';
import { TransactionItem } from './transactions/entities/transaction-item.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'dist'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [
        Product,
        ProductPicture,
        User,
        Cart,
        Transaction,
        TransactionItem,
      ],
      synchronize: true,
    }),
    ProductsModule,
    AuthModule,
    CartsModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
