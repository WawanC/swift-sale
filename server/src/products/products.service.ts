import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async create(data: { title: string; price: number; description: string }) {
    const newProduct = this.productsRepository.create({
      title: data.title.trim(),
      price: +data.price,
      description: data.description.trim(),
    });
    return await this.productsRepository.save(newProduct);
  }

  async findAll() {
    return await this.productsRepository.find();
  }

  async findOne(id: string) {
    return await this.productsRepository.findOne({ where: { id: id } });
  }

  async update(
    product: Product,
    data: { title?: string; price?: number; description?: string },
  ) {
    product.title = data.title ? data.title.trim() : product.title;
    product.price = data.price ? +data.price : product.price;
    product.description = data.description
      ? data.description.trim()
      : product.description;

    return await this.productsRepository.save(product);
  }

  async delete(product: Product) {
    return await this.productsRepository.remove(product);
  }
}
