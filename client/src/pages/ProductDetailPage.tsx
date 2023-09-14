import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useGetProduct } from "../hooks/Product.tsx";

type Params = {
  productId: string;
};

const ProductDetailPage = () => {
  const { productId } = useParams() as Params;
  const getProduct = useGetProduct(productId);
  const navigate = useNavigate();
  const [currentProductIdx, setCurrentProductIdx] = useState(0);

  console.log(JSON.stringify(getProduct.error));

  if (
    getProduct.error &&
    "status" in getProduct.error &&
    getProduct.error.status === 404
  )
    return (
      <main className={`flex-1 flex justify-center p-8`}>
        <h1 className={`text-4xl font-bold`}>Product not found</h1>
      </main>
    );

  return (
    <main className={`flex-1 flex justify-center items-center`}>
      <button
        className={`text-2xl absolute top-4 left-4`}
        onClick={() => navigate(-1)}
      >
        {"< Back"}
      </button>
      {getProduct.isLoading ? (
        <span>Loading...</span>
      ) : (
        getProduct.data && (
          <section
            className={`flex h-fit w-3/5 border border-black rounded-xl shadow overflow-hidden`}
          >
            <div
              className={`w-1/2 aspect-square p-8 border-r border-black
            flex flex-col items-center gap-8`}
            >
              <div
                className={`rounded overflow-hidden shadow w-full max-h-[75%]`}
              >
                {getProduct.data.pictures.length > 0 ? (
                  <img
                    src={getProduct.data.pictures[currentProductIdx].url}
                    alt="gambar"
                    className={`w-full h-full object-contain`}
                  />
                ) : (
                  <div className={`w-full aspect-square bg-neutral-500`}></div>
                )}
              </div>
              {getProduct.data.pictures.length > 0 && (
                <div className={`flex gap-4 text-2xl`}>
                  <button
                    onClick={() => {
                      if (currentProductIdx > 0)
                        setCurrentProductIdx((prev) => prev - 1);
                    }}
                  >
                    {"<"}
                  </button>
                  <span>
                    {currentProductIdx + 1} / {getProduct.data.pictures.length}
                  </span>
                  <button
                    onClick={() => {
                      if (
                        getProduct.data &&
                        currentProductIdx < getProduct.data.pictures.length - 1
                      )
                        setCurrentProductIdx((prev) => prev + 1);
                    }}
                  >
                    {">"}
                  </button>
                </div>
              )}
            </div>
            <div
              className={`w-1/2 aspect-square flex flex-col gap-4 p-16 items-center`}
            >
              <h1 className={`text-4xl font-bold`}>{getProduct.data.title}</h1>
              <h2 className={`text-2xl font-semibold`}>
                ${getProduct.data.price}
              </h2>
              <p className={`italic text-xl font-light`}>
                {getProduct.data.description}
              </p>
            </div>
          </section>
        )
      )}
    </main>
  );
};

export default ProductDetailPage;
