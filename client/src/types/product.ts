export type Picture = {
  public_id: string;
  url: string;
};

export type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  pictures: Picture[];
};

export type CreateProductPayload = {
  title: string;
  price: number;
  description: string;
  pictures?: File[];
};

export type UpdateProductPayload = {
  title?: string;
  price?: number;
  description?: string;
  pictures?: File[];
};

export type GetProductsResponse = {
  message: string;
  products: Product[];
};

export type GetProductResponse = {
  message: string;
  product: Product;
};

export type DeleteProductResponse = {
  message: string;
  product: Product;
};
