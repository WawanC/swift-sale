import { useAppDispatch, useAppSelector } from "../store/store.ts";
import { addCart } from "../store/cart.ts";

export const useGetCart = () => {
  const data = useAppSelector((state) => state.cart);

  return { data };
};

export const useAddCart = () => {
  const dispatch = useAppDispatch();
  const mutate = () => {
    dispatch(addCart("test"));
  };

  return { mutate };
};
