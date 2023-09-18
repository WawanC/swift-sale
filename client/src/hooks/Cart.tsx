import { useAppDispatch, useAppSelector } from "../store/store.ts";
import { useEffect, useMemo, useState } from "react";
import { createCartApi, deleteCartApi } from "../api/cart.ts";
import { checkError } from "../utils/error.ts";
import { fetchCartsThunk } from "../store/cart.ts";

export const useGetCarts = () => {
  const items = useAppSelector((state) => state.cart.items);
  const isFetching = useAppSelector((state) => state.cart.isFetching);
  const dispatch = useAppDispatch();

  const totalCount = useMemo(() => {
    let count = 0;
    items.forEach((item) => {
      count += item.count;
    });
    return count;
  }, [items]);

  const totalPrice = useMemo(() => {
    let total = 0;
    items.forEach((item) => {
      total += item.price * item.count;
    });
    return total;
  }, [items]);

  useEffect(() => {
    dispatch(fetchCartsThunk());
  }, []);

  return { items, totalCount, totalPrice, isFetching };
};

export const useAddCart = () => {
  const [error, setError] = useState<{
    message: string;
    code: number;
  } | null>(null);
  const dispatch = useAppDispatch();

  const mutate = async (data: { productId: string; count: number }) => {
    try {
      await createCartApi({ productId: data.productId, count: data.count });
    } catch (e) {
      checkError(e, setError);
    } finally {
      dispatch(fetchCartsThunk());
    }
  };

  return { mutate, error };
};

export const useDeleteCart = () => {
  const [error, setError] = useState<{
    message: string;
    code: number;
  } | null>(null);
  const dispatch = useAppDispatch();

  const mutate = async (data: { productId: string; count: number }) => {
    try {
      await deleteCartApi({ productId: data.productId, count: data.count });
    } catch (e) {
      checkError(e, setError);
    } finally {
      dispatch(fetchCartsThunk());
    }
  };

  return { mutate, error };
};
