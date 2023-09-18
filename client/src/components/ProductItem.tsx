import { Product } from "../types/product.ts";
import { FC, MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { useDeleteProduct } from "../hooks/Product.tsx";
import { useAppDispatch } from "../store/store.ts";
import { setProductsLoading } from "../store/products.ts";
import { useGetMe } from "../hooks/Auth.tsx";
import { useAddCart } from "../hooks/Cart.tsx";

type Props = {
  product: Product;
};

const ProductItem: FC<Props> = (props) => {
  const deleteProduct = useDeleteProduct(props.product.id);
  const dispatch = useAppDispatch();
  const getMe = useGetMe();
  const addCart = useAddCart();

  const onDeleteProduct: MouseEventHandler = async (e) => {
    e.preventDefault();

    dispatch(setProductsLoading(true));
    await deleteProduct.mutate();
  };

  const onAddCart: MouseEventHandler = async (e) => {
    e.preventDefault();

    await addCart.mutate({
      productId: props.product.id,
      count: 1,
    });
  };

  return (
    <Link
      to={`/products/${props.product.id}`}
      className={`w-1/4 p-4 border border-black shadow rounded
        flex flex-col gap-4`}
    >
      {props.product.pictures.length > 0 ? (
        <img
          src={props.product.pictures[0].url}
          alt={props.product.pictures[0].public_id}
          className={`w-full aspect-square object-cover bg-neutral-200 rounded`}
        />
      ) : (
        <div className={`w-full aspect-square bg-neutral-500 rounded`}></div>
      )}
      <div className={`flex flex-col items-center gap-2`}>
        <h1 className={`font-bold text-center`}>{props.product.title}</h1>
        <h2>${props.product.price}</h2>
        <div className={`flex gap-4`}>
          <Link
            to={`/edit-product/${props.product.id}`}
            className={`bg-neutral-200 p-2`}
          >
            Edit
          </Link>
          <button
            className={`bg-neutral-200 p-2 z-10`}
            onClick={onDeleteProduct}
          >
            Delete
          </button>
          {getMe.data.userId && (
            <button className={`bg-neutral-200 p-2 z-10`} onClick={onAddCart}>
              +Cart
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
