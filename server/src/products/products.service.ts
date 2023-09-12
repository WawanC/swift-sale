import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { UploadApiResponse, v2 } from 'cloudinary';
import * as fs from 'fs/promises';
import { ProductPicture } from './product-picture.entity';

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
    pictures: UploadApiResponse[];
  }) {
    const newProduct = this.productsRepository.create({
      title: data.title.trim(),
      price: +data.price,
      description: data.description.trim(),
    });

    await this.productsRepository.save(newProduct);

    for (const picture of data.pictures) {
      const productPicture = this.productPicturesRepository.create({
        public_id: picture.public_id,
        url: picture.url,
        product: newProduct,
      });
      await this.productPicturesRepository.save(productPicture);
    }

    return newProduct;
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

  async storePictures(pictures: Express.Multer.File[]) {
    const uploadResponses: UploadApiResponse[] = [];
    for (const picture of pictures) {
      // await fs.writeFile(
      //   path.join(__dirname, '..', '..', 'pictures', picture.originalname),
      //   picture.buffer,
      // );

      const uploadResponse = await v2.uploader.upload(picture.path, {
        folder: 'swiftsale/products',
      });
      await fs.unlink(picture.path);

      uploadResponses.push(uploadResponse);
    }
    return uploadResponses;
  }
}
