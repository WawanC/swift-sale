import { useGetProducts } from "../../hooks/Product.tsx";
import { useMemo } from "react";
import { useGetMe } from "../../hooks/Auth.tsx";
import MyProductItem from "./MyProductItem.tsx";

const MyProductList = () => {
  const getProducts = useGetProducts();
  const getMe = useGetMe();

  const myProducts = useMemo(
    () =>
      getProducts.data.filter(
        (product) => product.user.username === getMe.data.username,
      ),
    [getProducts.data, getMe.data.username],
  );

  return (
    <ul className={`py-4 flex flex-col gap-4`}>
      {getProducts.isFetching ? (
        <div className={`flex justify-center p-4`}>
          <p className={`text-4xl font-bold`}>Loading...</p>
        </div>
      ) : (
        myProducts.map((product) => (
          <MyProductItem key={product.id} product={product} />
        ))
      )}
    </ul>
  );
};

export default MyProductList;
