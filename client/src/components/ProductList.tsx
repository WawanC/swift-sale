import { Product } from "../types/product.ts";
import { FC } from "react";
import ProductItem from "./ProductItem.tsx";

type Props = {
  products: Product[];
  refreshProducts: () => Promise<void>;
};
const ProductList: FC<Props> = (props) => {
  return (
    <ul className={`flex flex-wrap gap-8 justify-center`}>
      {props.products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          refreshProducts={props.refreshProducts}
        />
      ))}
    </ul>
  );
};

export default ProductList;
