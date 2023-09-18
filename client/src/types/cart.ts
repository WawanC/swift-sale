export type CartItem = {
  productId: string;
  count: number;
  price: number;
};

export type GetCartsResponse = {
  message: string;
  carts: CartItem[];
};
