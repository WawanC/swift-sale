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
      className={`flex flex-col shadow border-2 border-secondary 
      p-4 rounded h-fit gap-2 text-xl`}
    >
      <div
        className={`w-[200px] aspect-square bg-secondary rounded shadow overflow-hidden`}
      >
        <img
          src={props.product.pictures[0].url}
          alt={props.product.id}
          className={`object-cover w-full h-full`}
        />
      </div>
      <div className={`flex flex-col gap-2`}>
        <h1 className={`font-bold`}>{props.product.title}</h1>
        <h2>$ {props.product.price}</h2>
        <div className={`flex justify-center`}>
          <button className={`btn text-base`}>Add to Cart</button>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
