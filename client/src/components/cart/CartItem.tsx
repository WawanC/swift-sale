import { CartItem } from "../../types/cart.ts";
import { FC, MouseEventHandler, useCallback } from "react";
import { useAddCart, useDeleteCart } from "../../hooks/Cart.tsx";

type Props = {
  item: CartItem;
};

const CartItem: FC<Props> = (props) => {
  const addCart = useAddCart();
  const deleteCart = useDeleteCart();

  const addCartHandler: MouseEventHandler = useCallback(
    async (e) => {
      e.preventDefault();
      await addCart.mutate({ productId: props.item.product.id, count: 1 });
    },
    [addCart],
  );

  const deleteCartHandler: MouseEventHandler = useCallback(
    async (e) => {
      e.preventDefault();
      await deleteCart.mutate({ productId: props.item.product.id, count: 1 });
    },
    [deleteCart],
  );

  return (
    <li
      className={`flex px-4 md:px-8 py-4 border-2 shadow rounded gap-4 items-center`}
    >
      <div
        className={`w-16 md:w-20 aspect-square bg-secondary rounded shadow overflow-hidden`}
      >
        {props.item.product.pictures.length > 0 && (
          <img
            src={props.item.product.pictures[0].url}
            alt={props.item.product.pictures[0].public_id}
            className={`w-full h-full object-cover`}
          />
        )}
      </div>
      <div className={`flex-1 flex flex-col gap-4`}>
        <h1 className={`text-xl md:text-2xl font-bold`}>
          {props.item.product.title}
        </h1>
        {/* Cart Item Counter Component */}
        <div className={`flex gap-2 px-4 py-2 rounded border text-xl w-fit`}>
          <button onClick={deleteCartHandler}>-</button>
          <span className={`text-center px-4`}>{props.item.count}</span>
          <button onClick={addCartHandler}>+</button>
        </div>
      </div>
      <div className={`flex justify-center items-center`}>
        <span className={`text-2xl md:text-2xl font-bold`}>
          ${props.item.price * props.item.count}
        </span>
      </div>
    </li>
  );
};

export default CartItem;
