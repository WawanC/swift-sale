import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { v2 } from 'cloudinary';
import * as fs from 'fs/promises';
import { ProductPicture } from './product-picture.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(ProductPicture)
    private productPicturesRepository: Repository<ProductPicture>,
  ) {}

  async create(data: { title: string; price: number; description: string }) {
    const newProduct = this.productsRepository.create({
      title: data.title.trim(),
      price: +data.price,
      description: data.description.trim(),
      pictures: [],
    });

    return await this.productsRepository.save(newProduct);
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

  async storePictures(product: Product, pictures: Express.Multer.File[]) {
    for (const oldPicture of product.pictures) {
      await v2.uploader.destroy(oldPicture.public_id);
      await this.productPicturesRepository.remove(oldPicture);
    }

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

  // async updatePictures(product: Product, pictures: Express.Multer.File[]) {
  //   // const oldPictures = await this.productPicturesRepository.find({
  //   //   where: { product: { id: product.id } },
  //   // });
  //
  //   for (const oldPicture of product.pictures) {
  //     await v2.uploader.destroy(oldPicture.public_id);
  //     await this.productPicturesRepository.remove(oldPicture);
  //   }
  //
  //   await this.storePictures(product, pictures);
  // }
}
