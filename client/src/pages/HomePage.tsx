import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useGetProducts } from "../hooks/Product.tsx";

const HomePage = () => {
  const [message, setMessage] = useState<string | null>(null);
  const getProducts = useGetProducts();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get<{
        message: string;
      }>("/api");
      return response.data.message;
    };
    fetchData().then((data) => setMessage(data));
  }, []);

  return (
    <main
      className={`flex flex-col items-center justify-center p-8 gap-8 flex-1 text-xl`}
    >
      <h1 className={`text-4xl font-bold`}>Hello from SwiftSale</h1>
      {message && <h2 className={`text-2xl font-semibold`}>{message}</h2>}
      <Link to={"/new-product"} className={`p-2 bg-neutral-200`}>
        Create New Product
      </Link>
      {getProducts.error ? (
        <span>{getProducts.error}</span>
      ) : getProducts.isLoading ? (
        <span>Loading...</span>
      ) : (
        getProducts.data && (
          <ul className={`flex flex-col items-center`}>
            {getProducts.data.map((p) => (
              <li key={p.id}>
                {p.title} - ${p.price} - {p.description}
              </li>
            ))}
          </ul>
        )
      )}
    </main>
  );
};

export default HomePage;
