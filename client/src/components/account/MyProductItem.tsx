import { Product } from "../../types/product.ts";
import { FC, MouseEventHandler, useMemo } from "react";
import { Link } from "react-router-dom";
import EditIcon from "../icons/EditIcon.tsx";
import DeleteIcon from "../icons/DeleteIcon.tsx";
import { useDeleteProduct } from "../../hooks/Product.tsx";

type Props = {
  product: Product;
};

const MyProductItem: FC<Props> = (props) => {
  const deleteProduct = useDeleteProduct(props.product.id);

  const deleteProductHandler: MouseEventHandler = useMemo(
    () => async (e) => {
      e.preventDefault();

      await deleteProduct.mutate();
    },
    [deleteProduct],
  );

  return (
    <Link
      to={`/products/${props.product.id}`}
      className={`p-4 flex border-2 rounded items-center gap-8`}
    >
      {deleteProduct.isLoading ? (
        <p className={`text-xl text-center flex-1`}>Deleting...</p>
      ) : (
        <>
          <div
            className={`w-16 aspect-square bg-black rounded overflow-hidden shadow`}
          >
            {props.product.pictures.length > 0 && (
              <img
                src={props.product.pictures[0].url}
                alt={props.product.pictures[0].public_id}
                className={`w-full h-full object-cover`}
              />
            )}
          </div>
          <h1 className={`flex-1 text-xl font-semibold`}>
            {props.product.title}
          </h1>

          {/*    Actions Menu */}
          <div className={`flex gap-4 items-center pr-4`}>
            <Link to={`/edit-product/${props.product.id}`}>
              <EditIcon className={`w-8 aspect-square`} />
            </Link>
            <button onClick={deleteProductHandler}>
              <DeleteIcon className={`w-8 aspect-square`} />
            </button>
          </div>
        </>
      )}
    </Link>
  );
};

export default MyProductItem;
