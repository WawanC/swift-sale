import { useGetTransactions } from "../../hooks/Transaction.tsx";
import MyTransactionItem from "./MyTransactionItem.tsx";

const MyTransactionList = () => {
  const getTransactions = useGetTransactions();

  return (
    <ul className={`py-4 flex flex-col gap-4`}>
      {getTransactions.isLoading ? (
        <div className={`flex justify-center p-4`}>
          <p className={`text-4xl font-bold`}>Loading...</p>
        </div>
      ) : (
        getTransactions.data.map((transaction) => (
          <MyTransactionItem key={transaction.id} transaction={transaction} />
        ))
      )}
    </ul>
  );
};

export default MyTransactionList;
