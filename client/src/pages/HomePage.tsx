import { Link } from "react-router-dom";
import { useGetProduct, useGetProducts } from "../hooks/Product.tsx";
import ProductList from "../components/ProductList.tsx";
import { useEffect } from "react";

const HomePage = () => {
  const getProducts = useGetProducts();
  const getProduct = useGetProduct("d007838f-4a8f-40f7-87b7-48d29c00eeef");

  useEffect(() => {
    console.log(getProduct.data);
  }, [getProduct.data]);

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
