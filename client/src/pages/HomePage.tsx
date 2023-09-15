import { Link } from "react-router-dom";
import ProductList from "../components/ProductList.tsx";
import { useGetProducts } from "../hooks/Product.tsx";
import { useGetMe, useLogout } from "../hooks/Auth.tsx";
import { useGetCart } from "../hooks/Cart.tsx";

const HomePage = () => {
  const getProducts = useGetProducts();
  const getMe = useGetMe();
  const logout = useLogout();
  const getCart = useGetCart();

  return (
    <main
      className={`flex flex-col items-center justify-center p-8 gap-8 flex-1 text-xl`}
    >
      <h1 className={`text-4xl font-bold`}>Hello from SwiftSale</h1>
      {getMe.data.username && (
        <div className={`flex gap-4 items-center`}>
          <h2 className={`text-2xl font-semibold`}>
            Hello {getMe.data.username}
          </h2>
          <Link to={"/cart"} className={`p-2 bg-neutral-200`}>
            My Cart : {getCart.data.count}
          </Link>
        </div>
      )}
      <Link to={"/new-product"} className={`p-2 bg-neutral-200`}>
        Create New Product
      </Link>
      {getMe.data.userId ? (
        <button
          className={`underline underline-offset-8`}
          onClick={() => logout.mutate()}
        >
          Logout
        </button>
      ) : (
        <div className={`flex gap-4`}>
          <Link to={"/register"} className={`underline underline-offset-8`}>
            Register
          </Link>
          <Link to={"/login"} className={`underline underline-offset-8`}>
            Login
          </Link>
        </div>
      )}
      {getProducts.isFetching ? (
        <span>Loading...</span>
      ) : (
        getProducts.data && (
          <section className={`w-3/4`}>
            <ProductList products={getProducts.data} />
          </section>
        )
      )}
    </main>
  );
};

export default HomePage;
