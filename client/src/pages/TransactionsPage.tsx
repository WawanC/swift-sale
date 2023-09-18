import { useNavigate } from "react-router-dom";

const TransactionsPage = () => {
  const navigate = useNavigate();

  return (
    <main className={`flex-1 flex flex-col p-8 gap-8 text-xl items-center`}>
      <button
        className={`text-2xl absolute top-4 left-4`}
        onClick={() => navigate(-1)}
      >
        {"< Back"}
      </button>
      <h1 className={`text-4xl font-bold`}>My Transactions</h1>
    </main>
  );
};

export default TransactionsPage;
