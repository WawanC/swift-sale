import { Product } from "../types/product.ts";
import { FC } from "react";
import ProductItem from "./ProductItem.tsx";

type Props = {
  products: Product[];
};
const ProductList: FC<Props> = (props) => {
  return (
    <ul className={`flex flex-wrap gap-2 md:gap-4 justify-center`}>
      {props.products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ul>
  );
};

export default ProductList;
