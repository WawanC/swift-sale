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
      rounded-lg h-fit text-xl overflow-hidden 
      w-[45%] md:w-fit items-center`}
    >
      <div
        className={`w-full md:w-[200px] aspect-square bg-secondary overflow-hidden`}
      >
        {props.product.pictures.length > 0 && (
          <img
            src={props.product.pictures[0].url}
            alt={props.product.id}
            className={`object-cover w-full h-full`}
          />
        )}
      </div>
      <div className={`flex flex-col gap-2 w-full px-4 py-2`}>
        <h1 className={`line-clamp-2`}>{props.product.title}</h1>
        <h2 className={`font-bold`}>$ {props.product.price}</h2>
        <div className={`flex justify-center`}>
          <button className={`btn text-sm`} onClick={addCartHandler}>
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
