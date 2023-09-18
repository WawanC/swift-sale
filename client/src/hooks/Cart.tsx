import { useAppDispatch, useAppSelector } from "../store/store.ts";
import { addCart } from "../store/cart.ts";
import { CartItem } from "../types/cart.ts";
import { useMemo } from "react";

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
  const dispatch = useAppDispatch();
  const mutate = (item: CartItem) => {
    dispatch(addCart(item));
  };

  return { mutate };
};
