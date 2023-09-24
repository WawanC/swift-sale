import { useParams } from "react-router-dom";
import { useGetProduct } from "../hooks/Product.tsx";
import AccountIcon from "../components/icons/AccountIcon.tsx";
import { useCallback, useState } from "react";
import ProductPictureDisplay from "../components/ProductPictureDisplay.tsx";

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
    <main className={`flex-1 flex justify-center md:items-center`}>
      {getProduct.isLoading ? (
        <div>
          <p className={`text-4xl font-bold`}>Loading...</p>
        </div>
      ) : (
        getProduct.data && (
          <article
            className={`w-full md:w-3/4 rounded shadow-lg md:border-2 md:py-8
        flex-col md:flex md:flex-row`}
          >
            {/* Pictures Section */}
            <section className={`md:flex-[1.25] md:p-4`}>
              {getProduct.data.pictures && (
                <ProductPictureDisplay
                  pictures={
                    getProduct.data.pictures.length > 0
                      ? getProduct.data.pictures
                      : []
                  }
                />
              )}
            </section>

            {/* Info Section */}
            <section
              className={`flex-1 md:border-x flex flex-col items-center 
              px-8 py-4 gap-4 md:gap-8`}
            >
              <h1 className={"text-4xl font-bold"}>{getProduct.data.title}</h1>
              <h2 className={`text-3xl font-semibold`}>
                ${getProduct.data.price}
              </h2>
              <p
                className={`font-sans text-base font-light italic w-full text-center`}
              >
                {getProduct.data.description}
              </p>
            </section>

            {/* Action Section */}
            <section className={`flex-[0.75] flex flex-col gap-4 p-4`}>
              {/* Sold by info */}
              <div className={`flex flex-col gap-2`}>
                <span className={`text-xl font-semibold`}>Sold By :</span>
                <div className={`flex gap-4 items-center`}>
                  <AccountIcon className={`w-16 h-16`} strokeWidth={0.5} />
                  <span className={`text-xl`}>
                    {getProduct.data.user.username}
                  </span>
                </div>
              </div>

              {/*  Add Cart button */}
              <div className={`flex flex-col gap-4 items-center`}>
                <div
                  className={`flex border-2 text-2xl rounded py-2 px-4 w-1/2`}
                >
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
                <button className={`btn`}>Add to Cart</button>
              </div>
            </section>
          </article>
        )
      )}
    </main>
  );
};

export default ProductDetailPage;
