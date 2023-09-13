import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [message, setMessage] = useState<string | null>(null);

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
    </main>
  );
};

export default HomePage;
