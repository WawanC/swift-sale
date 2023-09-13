import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateProduct } from "../hooks/Product.tsx";

const NewProductPage = () => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredPrice, setEnteredPrice] = useState(0);
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredPictures, setEnteredPictures] = useState<FileList | null>(null);
  const navigate = useNavigate();
  const createProduct = useCreateProduct();

  const submitFormHandler: FormEventHandler = async (e) => {
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

      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main
      className={`flex-1 flex justify-center items-center flex-col gap-8 text-xl`}
    >
      <h1 className={`text-4xl font-bold`}>Create New Product</h1>
      {createProduct.isLoading ? (
        <span className={`text-2xl font-semibold`}>Loading...</span>
      ) : (
        <>
          {createProduct.error && (
            <span className={`text-2xl text-red-500`}>
              {createProduct.error}
            </span>
          )}
          <form
            onSubmit={submitFormHandler}
            className={`flex flex-col gap-8 w-1/3`}
          >
            <div className={`flex justify-between items-center`}>
              <label htmlFor={"title"} className={`font-semibold`}>
                Title :
              </label>
              <input
                type="text"
                name={`title`}
                required={true}
                className={`p-2 border border-black`}
                value={enteredTitle}
                onChange={(e) => setEnteredTitle(e.target.value)}
              />
            </div>
            <div className={`flex justify-between items-center`}>
              <label htmlFor={"price"} className={`font-semibold`}>
                Price :
              </label>
              <input
                type="number"
                name={`price`}
                required={true}
                className={`p-2 border border-black`}
                value={enteredPrice}
                onChange={(e) => setEnteredPrice(+e.target.value)}
              />
            </div>
            <div className={`flex flex-col gap-2`}>
              <label htmlFor={"description"} className={`font-semibold`}>
                Description :
              </label>
              <textarea
                name={`description`}
                className={`p-2 border border-black`}
                required={true}
                rows={4}
                value={enteredDescription}
                onChange={(e) => setEnteredDescription(e.target.value)}
              />
            </div>
            <div className={`flex justify-between items-center`}>
              <label htmlFor={"picture"} className={`font-semibold`}>
                Pictures :
              </label>
              <input
                type="file"
                name={`picture`}
                required={true}
                className={`w-1/2`}
                onChange={(e) => {
                  setEnteredPictures(e.target.files);
                }}
                multiple={true}
              />
            </div>
            <div className={`flex justify-center`}>
              <button type={"submit"} className={`p-2 bg-neutral-200`}>
                Create
              </button>
            </div>
          </form>
        </>
      )}
    </main>
  );
};
export default NewProductPage;
