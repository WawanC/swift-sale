import { Link } from "react-router-dom";
import { useGetProducts } from "../hooks/Product.tsx";
import ProductList from "../components/ProductList.tsx";

const HomePage = () => {
  const getProducts = useGetProducts();

  return (
    <main
      className={`flex flex-col items-center justify-center p-8 gap-8 flex-1 text-xl`}
    >
      <h1 className={`text-4xl font-bold`}>Hello from SwiftSale</h1>
      <Link to={"/new-product"} className={`p-2 bg-neutral-200`}>
        Create New Product
      </Link>
      {getProducts.error ? (
        <span>{getProducts.error}</span>
      ) : getProducts.isLoading ? (
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
