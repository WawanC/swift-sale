import { useNavigate } from "react-router-dom";
import { useGetTransactions } from "../hooks/Transaction.tsx";

const TransactionsPage = () => {
  const navigate = useNavigate();
  const getTransactions = useGetTransactions();

  return (
    <main className={`flex-1 flex flex-col p-8 gap-8 text-2xl items-center`}>
      <button
        className={`text-2xl absolute top-4 left-4`}
        onClick={() => navigate(-1)}
      >
        {"< Back"}
      </button>
      <h1 className={`text-4xl font-bold`}>My Transactions</h1>
      {getTransactions.isLoading ? (
        <p className={`text-3xl font-semibold`}>Loading...</p>
      ) : (
        <ul className={`flex flex-col gap-4`}>
          {getTransactions.data.map((transaction, idx) => (
            <li key={transaction.id} className={`flex gap-2`}>
              <span>{idx + 1}.</span>
              <span>
                {transaction.items.map(
                  (item) => item.productTitle + ` x${item.count}` + " ",
                )}
              </span>
              <span className={`font-semibold`}>${transaction.totalPrice}</span>
              <span>
                {new Date(transaction.createdAt).toLocaleString("en-US")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default TransactionsPage;
