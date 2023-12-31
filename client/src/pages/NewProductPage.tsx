import { FormEventHandler, useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateProduct } from "../hooks/Product.tsx";
import ProductPictureDisplay from "../components/ProductPictureDisplay.tsx";

type Picture = {
  url: string;
  public_id: string;
};

const NewProductPage = () => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredPrice, setEnteredPrice] = useState(1);
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredPictures, setEnteredPictures] = useState<FileList | null>(null);

  const previewPictures = useMemo(() => {
    const temp: Picture[] = [];

    if (!enteredPictures) return [];

    for (const picFile of enteredPictures) {
      temp.push({
        url: URL.createObjectURL(picFile),
        public_id: Math.random().toString(),
      });
    }

    return temp;
  }, [enteredPictures]);

  const navigate = useNavigate();
  const createProduct = useCreateProduct();

  const submitFormHandler: FormEventHandler = useCallback(
    async (e) => {
      e.preventDefault();

      const pictures: File[] = [];
      if (enteredPictures)
        for (const picture of enteredPictures) {
          pictures.push(picture);
        }

      try {
        await createProduct.mutate({
          title: enteredTitle.trim(),
          price: enteredPrice,
          description: enteredDescription.trim(),
          pictures: pictures,
        });

        navigate("/account");
      } catch (e) {
        console.error(e);
      }
    },
    [
      enteredTitle,
      enteredPrice,
      enteredDescription,
      enteredPictures,
      createProduct,
    ],
  );

  return (
    <main className={`flex-1 flex justify-center md:items-center`}>
      <section
        className={`min-w-full md:min-w-[75%] md:border-2 shadow
      flex flex-col gap-8 py-8`}
      >
        <h1 className={`text-4xl font-bold text-center`}>Create New Product</h1>
        {createProduct.isLoading ? (
          <div className={`flex-1 flex justify-center p-8`}>
            <p className={`text-4xl font-bold`}>Loading...</p>
          </div>
        ) : (
          <>
            {createProduct.error && (
              <div className={`flex justify-center`}>
                <span className={`text-red-500 text-2xl font-semibold`}>
                  {createProduct.error.message}
                </span>
              </div>
            )}
            <form
              className={`flex-1 flex flex-col md:flex-row`}
              onSubmit={submitFormHandler}
            >
              {/* Picture Section */}
              <div
                className={`flex-1 flex flex-col justify-center items-center gap-8`}
              >
                <div className={`w-full md:w-3/4`}>
                  <ProductPictureDisplay pictures={previewPictures} />
                </div>
                <input
                  id={"picture"}
                  type="file"
                  className={"hidden"}
                  onChange={(e) => {
                    if (!e.target.files) return;
                    if (e.target.files.length > 4)
                      return alert("Max 4 pictures allowed");
                    setEnteredPictures(e.target.files);
                  }}
                  multiple={true}
                />
                <label
                  htmlFor={"picture"}
                  className={"btn text-xl hover:cursor-pointer"}
                >
                  Upload Picture
                </label>
              </div>

              {/* Info Section */}
              <div
                className={`flex-1 border-l flex flex-col gap-4 text-xl p-4 md:p-8`}
              >
                <div className={`flex flex-col gap-2`}>
                  <label htmlFor="title" className={`font-semibold`}>
                    Title :
                  </label>
                  <input
                    id={"title"}
                    type="text"
                    className={`input`}
                    placeholder={"Enter product title"}
                    value={enteredTitle}
                    onChange={(e) => setEnteredTitle(e.target.value)}
                    required={true}
                  />
                </div>

                <div className={`flex flex-col gap-2`}>
                  <label htmlFor="price" className={`font-semibold`}>
                    Price :
                  </label>
                  <div className={`flex gap-4 items-center w-1/2 md:w-1/5`}>
                    <span className={`text-3xl font-bold`}>$</span>
                    <input
                      id={"price"}
                      type="text"
                      className={`input text-center`}
                      value={enteredPrice}
                      onChange={(e) => {
                        if (!isNaN(+e.target.value))
                          setEnteredPrice(+e.target.value);
                      }}
                      required={true}
                    />
                  </div>
                </div>

                <div className={`flex flex-col gap-2`}>
                  <label htmlFor="description" className={`font-semibold`}>
                    Description :
                  </label>
                  <textarea
                    id={"description"}
                    className={`input`}
                    placeholder={"Enter product description"}
                    rows={4}
                    value={enteredDescription}
                    onChange={(e) => setEnteredDescription(e.target.value)}
                    required={true}
                  />
                </div>

                <div className={`flex justify-center`}>
                  <button type={"submit"} className={`btn`}>
                    Create
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </section>
    </main>
  );
};
export default NewProductPage;
