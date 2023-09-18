import { useAddCart, useDeleteCart, useGetCarts } from "../hooks/Cart.tsx";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const getCarts = useGetCarts();
  const navigate = useNavigate();
  const deleteCart = useDeleteCart();
  const addCart = useAddCart();

  return (
    <main className={"flex-1 flex flex-col items-center p-8 gap-8 text-xl"}>
      <button
        className={`text-2xl absolute top-4 left-4`}
        onClick={() => navigate(-1)}
      >
        {"< Back"}
      </button>
      <h1 className={"text-4xl font-bold"}>My Cart</h1>
      <h2 className={`text-2xl font-semibold`}>
        Total Count: {getCarts.totalCount}
      </h2>
      <ul className={`flex flex-col gap-4`}>
        {getCarts.items.map((item) => (
          <li key={item.product.id} className={`flex gap-8 items-center`}>
            <span>
              {item.product.title} ({item.count}) {"=>"} {item.product.price} x{" "}
              {item.count} == ${item.product.price * item.count}
            </span>
            <div className={`flex gap-2`}>
              <button
                className={`bg-neutral-200 p-2`}
                onClick={async () => {
                  await addCart.mutate({
                    productId: item.product.id,
                    count: 1,
                  });
                }}
              >
                Increase
              </button>
              <button
                className={`bg-neutral-200 p-2`}
                onClick={async () => {
                  await deleteCart.mutate({
                    productId: item.product.id,
                    count: 1,
                  });
                }}
              >
                Decrease
              </button>
              <button
                className={`bg-neutral-200 p-2`}
                onClick={async () => {
                  await deleteCart.mutate({
                    productId: item.product.id,
                    count: item.count,
                  });
                }}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h2 className={`text-2xl font-semibold`}>
        Total Price: ${getCarts.totalPrice}
      </h2>
      <button className={`p-2 bg-neutral-200 font-semibold`}>Checkout</button>
    </main>
  );
};

export default CartPage;
