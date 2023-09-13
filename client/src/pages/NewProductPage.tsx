const NewProductPage = () => {
  return (
    <main
      className={`flex-1 flex justify-center items-center flex-col gap-8 text-xl`}
    >
      <h1 className={`text-4xl font-bold`}>Create New Product</h1>
      <form className={`flex flex-col gap-8 w-1/3`}>
        <div className={`flex justify-between items-center`}>
          <label htmlFor={"title"} className={`font-semibold`}>
            Title :
          </label>
          <input
            type="text"
            name={`title`}
            className={`p-2 border border-black`}
          />
        </div>
        <div className={`flex justify-between items-center`}>
          <label htmlFor={"price"} className={`font-semibold`}>
            Price :
          </label>
          <input
            type="number"
            name={`price`}
            className={`p-2 border border-black`}
            defaultValue={0}
          />
        </div>
        <div className={`flex flex-col gap-2`}>
          <label htmlFor={"description"} className={`font-semibold`}>
            Description :
          </label>
          <textarea
            name={`description`}
            className={`p-2 border border-black`}
            rows={4}
          />
        </div>
        <div className={`flex justify-between items-center`}>
          <label htmlFor={"picture"} className={`font-semibold`}>
            Pictures :
          </label>
          <input type="file" name={`picture`} className={`w-1/2`} />
        </div>
        <div className={`flex justify-center`}>
          <button type={"submit"} className={`p-2 bg-neutral-200`}>
            Create
          </button>
        </div>
      </form>
    </main>
  );
};
export default NewProductPage;
