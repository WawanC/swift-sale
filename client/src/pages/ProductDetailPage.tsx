import { useParams } from "react-router-dom";
import { useGetProduct } from "../hooks/Product.tsx";
import AccountIcon from "../components/icons/AccountIcon.tsx";
import { useCallback, useState } from "react";

type Params = {
  productId: string;
};

const ProductDetailPage = () => {
  const { productId } = useParams() as Params;
  const getProduct = useGetProduct(productId);
  const [addCartCounter, setAddCartCounter] = useState(1);

  const incrementCartCounter = useCallback(() => {
    setAddCartCounter((counter) => counter + 1);
  }, []);

  const decrementCartCounter = useCallback(() => {
    setAddCartCounter((counter) => {
      if (counter === 1) return counter;
      return counter - 1;
    });
  }, []);

  if (
    getProduct.error &&
    "code" in getProduct.error &&
    getProduct.error.code === 404
  )
    return (
      <main className={`flex-1 flex justify-center p-8`}>
        <h1 className={`text-4xl font-bold`}>Product not found</h1>
      </main>
    );

  return (
    <main className={`flex-1 flex justify-center items-center`}>
      <article
        className={`w-3/4 h-[500px] rounded shadow-lg border-2 py-8
        flex`}
      >
        {/* Pictures Section */}
        <section className={`flex-[1.25] p-4 flex flex-col items-center`}>
          <div
            className={`w-3/4 aspect-square bg-neutral-200 border 
            rounded shadow overflow-hidden`}
          >
            <img
              src={getProduct.data?.pictures[0]?.url}
              alt={getProduct.data?.pictures[0]?.public_id}
              className={`w-full h-full object-cover`}
            />
          </div>
        </section>

        {/* Info Section */}
        <section
          className={`flex-1 border-x flex flex-col items-center px-8 py-4 gap-8`}
        >
          <h1 className={"text-4xl font-bold"}>{getProduct.data?.title}</h1>
          <h2 className={`text-3xl font-semibold`}>
            ${getProduct.data?.price}
          </h2>
          <p
            className={`font-sans text-base font-light italic w-full text-center`}
          >
            {getProduct.data?.description}
          </p>
        </section>

        {/* Action Section */}
        <section className={`flex-[0.75] flex flex-col gap-4 p-4`}>
          {/* Sold by info */}
          <div className={`flex flex-col gap-2`}>
            <span className={`text-xl font-semibold`}>Sold By :</span>
            <div className={`flex gap-4 items-center`}>
              <AccountIcon className={`w-16 h-16 stroke-[0.5]`} />
              <span className={`text-xl`}>
                {getProduct.data?.user.username}
              </span>
            </div>
          </div>

          {/*  Add Cart button */}
          <div className={`flex flex-col gap-4 items-center`}>
            <div className={`flex border-2 text-2xl rounded py-2 px-4 w-1/2`}>
              <button
                className={`text-neutral-400`}
                onClick={decrementCartCounter}
              >
                -
              </button>
              <span className={`flex-1 text-center`}>{addCartCounter}</span>
              <button
                className={`text-neutral-400`}
                onClick={incrementCartCounter}
              >
                +
              </button>
            </div>
            <button
              className={`bg-secondary py-2 px-4 rounded w-fit font-semibold`}
            >
              Add to Cart
            </button>
          </div>
        </section>
      </article>
    </main>
  );
};

export default ProductDetailPage;
