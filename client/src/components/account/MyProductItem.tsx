import { Product } from "../../types/product.ts";
import { FC } from "react";
import { Link } from "react-router-dom";
import EditIcon from "../icons/EditIcon.tsx";
import DeleteIcon from "../icons/DeleteIcon.tsx";

type Props = {
  product: Product;
};

const MyProductItem: FC<Props> = (props) => {
  return (
    <Link
      to={`/products/${props.product.id}`}
      className={`p-4 flex border-2 rounded items-center gap-8`}
    >
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
      <h1 className={`flex-1 text-xl font-semibold`}>{props.product.title}</h1>

      {/*    Actions Menu */}
      <div className={`flex gap-4 items-center pr-4`}>
        <EditIcon className={`w-8 aspect-square`} />
        <DeleteIcon className={`w-8 aspect-square`} />
      </div>
    </Link>
  );
};

export default MyProductItem;
