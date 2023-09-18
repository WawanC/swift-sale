import { privateAxios } from "../utils/axios.ts";
import axios from "axios";
import { GetTransactionsResponse } from "../types/transaction.ts";

export const createTransactionApi = async () => {
  return await privateAxios.post("/api/transactions");
};

export const getTransactionsApi = async () => {
  const response =
    await axios.get<GetTransactionsResponse>("/api/transactions");
  response.data.transactions.forEach((transaction) => {
    let totalPrice = 0;
    transaction.items.forEach(
      (item) => (totalPrice += item.price * item.count),
    );
    transaction.totalPrice = totalPrice;
  });
  return response.data.transactions;
};
