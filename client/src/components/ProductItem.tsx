import { Product } from "../types/product.ts";
import { FC } from "react";
import { Link } from "react-router-dom";

type Props = {
  product: Product;
};

const ProductItem: FC<Props> = (props) => {
  return (
    <Link
      to={`/products/${props.product.id}`}
      className={`w-1/4 p-4 border border-black shadow rounded
        flex flex-col gap-4`}
    >
      <img
        src={props.product.pictures[0].url}
        alt={props.product.pictures[0].public_id}
        className={`w-full aspect-square object-cover bg-neutral-200 rounded`}
      />
      <div className={`flex flex-col items-center`}>
        <h1 className={`font-bold text-center`}>{props.product.title}</h1>
        <h2>${props.product.price}</h2>
      </div>
    </Link>
  );
};

export default ProductItem;
