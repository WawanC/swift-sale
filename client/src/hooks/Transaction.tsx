import { useState } from "react";
import { checkError } from "../utils/error.ts";
import { createTransactionApi } from "../api/transaction.ts";
import { useAppDispatch } from "../store/store.ts";
import { fetchCartsThunk } from "../store/cart.ts";

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
