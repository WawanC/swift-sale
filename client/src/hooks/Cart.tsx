import { useAppSelector } from "../store/store.ts";
import { CartItem } from "../types/cart.ts";
import { useMemo, useState } from "react";
import { createCartApi } from "../api/cart.ts";
import { checkError } from "../utils/error.ts";

export const useGetCart = () => {
  const items = useAppSelector((state) => state.cart.items);

  const totalCount = useMemo(() => {
    let count = 0;
    items.forEach((item) => {
      count += item.count;
    });
    return count;
  }, [items]);

  return { items, totalCount };
};

export const useAddCart = () => {
  const [error, setError] = useState<{
    message: string;
    code: number;
  } | null>(null);

  const mutate = async (item: CartItem) => {
    try {
      await createCartApi({ productId: item.productId, count: item.count });
      console.log("create cart success");
    } catch (e) {
      checkError(e, setError);
    }
  };

  return { mutate, error };
};
