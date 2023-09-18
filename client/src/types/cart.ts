import { Product } from "./product.ts";

export type CartItem = {
  product: Product;
  count: number;
  price: number;
};

export type GetCartsResponse = {
  message: string;
  carts: CartItem[];
};
