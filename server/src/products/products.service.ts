import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { v2 } from 'cloudinary';
import * as fs from 'fs/promises';
import { ProductPicture } from './entities/product-picture.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(ProductPicture)
    private productPicturesRepository: Repository<ProductPicture>,
  ) {}

  async create(data: {
    title: string;
    price: number;
    description: string;
    pictures: Express.Multer.File[];
  }) {
    const product = this.productsRepository.create({
      title: data.title.trim(),
      price: +data.price,
      description: data.description.trim(),
      pictures: [],
    });

    const newProduct = await this.productsRepository.save(product);

    if (data.pictures && data.pictures.length > 0) {
      await this.storePictures(newProduct, data.pictures);
    }

    return newProduct;
  }

  async findAll() {
    return await this.productsRepository.find({ relations: ['pictures'] });
  }

  async findOne(id: string) {
    return await this.productsRepository.findOne({
      where: { id: id },
      relations: ['pictures'],
    });
  }

  async update(
    product: Product,
    data: {
      title?: string;
      price?: number;
      description?: string;
      pictures: Express.Multer.File[];
    },
  ) {
    product.title = data.title ? data.title.trim() : product.title;
    product.price = data.price ? +data.price : product.price;
    product.description = data.description
      ? data.description.trim()
      : product.description;

    const updatedProduct = await this.productsRepository.save(product);

    if (data.pictures && data.pictures.length > 0) {
      await this.storePictures(updatedProduct, data.pictures);
    }

    return updatedProduct;
  }

  async delete(product: Product) {
    await this.deletePictures(product);
    return await this.productsRepository.remove(product);
  }

  async storePictures(product: Product, pictures: Express.Multer.File[]) {
    await this.deletePictures(product);

    for (const picture of pictures) {
      const uploadResponse = await v2.uploader.upload(picture.path, {
        folder: 'swiftsale/products',
      });
      await fs.unlink(picture.path);

      const productPicture = this.productPicturesRepository.create({
        public_id: uploadResponse.public_id,
        url: uploadResponse.url,
        product: product,
      });

      await this.productPicturesRepository.save(productPicture);
    }
  }

  async deletePictures(product: Product) {
    for (const oldPicture of product.pictures) {
      await v2.uploader.destroy(oldPicture.public_id);
      await this.productPicturesRepository.remove(oldPicture);
    }
  }
}
