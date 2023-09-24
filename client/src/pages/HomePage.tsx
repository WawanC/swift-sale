import ProductList from "../components/ProductList.tsx";
import { useGetProducts } from "../hooks/Product.tsx";

const HomePage = () => {
  const getProducts = useGetProducts();

  return (
    <main className={`flex flex-col items-center py-4 md:p-8 flex-1 text-xl`}>
      {getProducts.isFetching ? (
        <span>Loading...</span>
      ) : (
        getProducts.data && (
          <section className={`w-full md:w-3/4`}>
            <ProductList products={getProducts.data} />
          </section>
        )
      )}
    </main>
  );
};

export default HomePage;
