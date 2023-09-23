import { Product } from "../types/product.ts";
import { FC, MouseEventHandler, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAddCart } from "../hooks/Cart.tsx";

type Props = {
  product: Product;
};

const ProductItem: FC<Props> = (props) => {
  const addCart = useAddCart();

  const addCartHandler: MouseEventHandler = useCallback(
    async (e) => {
      e.preventDefault();
      await addCart.mutate({ productId: props.product.id, count: 1 });
    },
    [addCart],
  );

  return (
    <Link
      to={`/products/${props.product.id}`}
      className={`flex flex-col shadow border-2 border-secondary 
      p-4 rounded h-fit gap-2 text-xl 
      w-full md:w-fit items-center`}
    >
      <div
        className={`w-full md:w-[200px] aspect-square bg-secondary rounded shadow overflow-hidden`}
      >
        {props.product.pictures.length > 0 && (
          <img
            src={props.product.pictures[0].url}
            alt={props.product.id}
            className={`object-cover w-full h-full`}
          />
        )}
      </div>
      <div className={`flex flex-col gap-2 w-full`}>
        <h1 className={`font-bold`}>{props.product.title}</h1>
        <h2>$ {props.product.price}</h2>
        <div className={`flex justify-center`}>
          <button className={`btn text-base`} onClick={addCartHandler}>
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
