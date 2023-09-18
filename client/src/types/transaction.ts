type TransactionItem = {
  id: string;
  productTitle: string;
  count: number;
  price: number;
};

export type Transaction = {
  id: string;
  createdAt: string;
  totalPrice: number;
  items: TransactionItem[];
};

export type GetTransactionsResponse = {
  message: string;
  transactions: Transaction[];
};
