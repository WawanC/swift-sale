import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
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
      className={`flex flex-col items-center justify-center p-8 gap-8 min-h-screen`}
    >
      <h1 className={`text-4xl font-bold`}>Hello from SwiftSale</h1>
      {message && <h2 className={`text-2xl font-semibold`}>{message}</h2>}
    </main>
  );
};

export default App;
