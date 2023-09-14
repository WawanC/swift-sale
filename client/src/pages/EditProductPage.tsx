import { FormEventHandler, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProduct } from "../hooks/Product.tsx";

type Params = {
  productId: string;
};
const EditProductPage = () => {
  const { productId } = useParams() as Params;
  const getProduct = useGetProduct(productId);

  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredPrice, setEnteredPrice] = useState(0);
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredPictures, setEnteredPictures] = useState<FileList | null>(null);
  const navigate = useNavigate();

  const submitFormHandler: FormEventHandler = async (e) => {
    e.preventDefault();

    const pictures: File[] = [];
    if (enteredPictures)
      for (const picture of enteredPictures) {
        pictures.push(picture);
      }

    try {
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (getProduct.data) {
      setEnteredTitle(getProduct.data.title);
      setEnteredPrice(getProduct.data.price);
      setEnteredDescription(getProduct.data.description);
    }
  }, [getProduct.data]);

  if (getProduct.error && getProduct.error.code === 404)
    return (
      <main className={`flex-1 flex justify-center p-8`}>
        <h1 className={`text-4xl font-bold`}>Product not found</h1>
      </main>
    );

  return (
    <main
      className={`flex-1 flex justify-center items-center flex-col gap-8 text-xl`}
    >
      <h1 className={`text-4xl font-bold`}>Edit Product</h1>
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
            className={`w-1/2`}
            onChange={(e) => {
              setEnteredPictures(e.target.files);
            }}
            multiple={true}
          />
        </div>
        <div className={`flex justify-center`}>
          <button type={"submit"} className={`p-2 bg-neutral-200`}>
            Update
          </button>
        </div>
      </form>
    </main>
  );
};

export default EditProductPage;
