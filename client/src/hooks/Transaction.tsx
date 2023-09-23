import { useEffect, useState } from "react";
import { checkError } from "../utils/error.ts";
import {
  createTransactionApi,
  getTransactionsApi,
} from "../api/transaction.ts";
import { useAppDispatch } from "../store/store.ts";
import { fetchCartsThunk } from "../store/cart.ts";
import { Transaction } from "../types/transaction.ts";

export const useCreateTransaction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{
    message: string;
    code: number;
  } | null>(null);
  const dispatch = useAppDispatch();
  const mutate = async () => {
    try {
      setIsLoading(true);
      await createTransactionApi();
    } catch (e) {
      checkError(e, setError);
    } finally {
      dispatch(fetchCartsThunk());
      setIsLoading(false);
    }
  };

  return { mutate, error, isLoading };
};

export const useGetTransactions = () => {
  const [data, setData] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{
    message: string;
    code: number;
  } | null>(null);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const transactions = await getTransactionsApi();
      setData(
        transactions.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
      );
    } catch (e) {
      checkError(e, setError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, error, isLoading };
};
