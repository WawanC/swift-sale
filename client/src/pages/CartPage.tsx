import { useGetCarts } from "../hooks/Cart.tsx";
import CartItem from "../components/cart/CartItem.tsx";

const CartPage = () => {
  const getCarts = useGetCarts();

  return (
    <main className={`flex-1 flex justify-center py-16`}>
      <article className={`w-3/4 h-fit flex`}>
        {/* Manage Cart Section */}
        <div className={`flex-1 flex flex-col border-r-2 p-4 pr-8`}>
          <div className={`border-b-2 border-secondary pb-4`}>
            <h1 className={`text-4xl font-bold`}>My Cart</h1>
          </div>
          {getCarts.isFetching ? (
            <div className={`flex justify-center py-8`}>
              <p className={`text-4xl font-bold`}>Loading...</p>
            </div>
          ) : (
            <ul className={`flex flex-col gap-4 py-4`}>
              {getCarts.items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </ul>
          )}
        </div>

        {/* Cart Info Section */}
        <div className={`flex-[0.5] flex flex-col gap-4 `}>
          <div className={`flex flex-col gap-2 p-8`}>
            <span className={`text-3xl font-semibold`}>Total Price :</span>
            <span className={`text-4xl font-bold text-center`}>
              ${getCarts.totalPrice}
            </span>
          </div>
          <div className={`flex justify-center`}>
            <button className={`btn`}>Checkout</button>
          </div>
        </div>
      </article>
    </main>
  );
};

export default CartPage;
