import ProductList from "../components/ProductList.tsx";
import { useGetProducts } from "../hooks/Product.tsx";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const getProducts = useGetProducts({
    search: searchParams.get("search") || undefined,
  });

  useEffect(() => {
    getProducts.refetch({ search: searchParams.get("search") || undefined });
  }, [searchParams]);

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

export default ProductsPage;
