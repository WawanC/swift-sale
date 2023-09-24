import AccountIcon from "../components/icons/AccountIcon.tsx";
import { useGetMe } from "../hooks/Auth.tsx";
import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import MyTransactionList from "../components/account/MyTransactionList.tsx";
import MyProductList from "../components/account/MyProductList.tsx";
import AddIcon from "../components/icons/AddIcon.tsx";

enum Menu {
  Products,
  Transactions,
}

const AccountPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const getMe = useGetMe();

  const selectedMenu = useMemo(
    () =>
      searchParams.has("menu") && searchParams.get("menu") === "transactions"
        ? Menu.Transactions
        : Menu.Products,
    [searchParams],
  );

  return (
    <main className={`flex-1 flex justify-center md:py-16`}>
      <article
        className={`min-w-full md:min-w-[50%] flex flex-col gap-4 px-8 overflow-hidden`}
      >
        {/*    Account Info Section */}
        <section
          className={`flex flex-col md:flex-row md:border-2 rounded-lg md:shadow p-8`}
        >
          <div className={"flex-1 flex justify-center items-center"}>
            <AccountIcon className={`w-64 aspect-square`} strokeWidth={0.5} />
          </div>
          <div
            className={`flex-1 flex flex-col gap-2 justify-center items-center`}
          >
            <h1 className={`text-4xl font-bold`}>{getMe.data.username}</h1>
            <h2 className={`text-2xl font-semibold`}>{getMe.data.email}</h2>
          </div>
        </section>

        {/*    Account Menu Section */}
        <section className={`flex flex-col gap-8`}>
          {/* Toggle Menu */}
          <div className={`flex gap-2 md:gap-4`}>
            <button
              className={`btn flex-1 bg-primary border-2 ${
                selectedMenu === Menu.Products && "bg-secondary border-none"
              }`}
              onClick={() => setSearchParams({ menu: "products" })}
            >
              My Products
            </button>
            <button
              className={`btn flex-1 bg-primary border-2 ${
                selectedMenu === Menu.Transactions && "bg-secondary border-none"
              }`}
              onClick={() => setSearchParams({ menu: "transactions" })}
            >
              My Transactions
            </button>
          </div>

          {/*  Menu Content */}
          <div className={`flex flex-col`}>
            {/* Title Section */}
            <div className={`flex border-b-2 border-accent pb-2 items-center`}>
              <h1 className={`flex-1 text-2xl md:text-4xl font-bold`}>
                {selectedMenu === Menu.Products
                  ? "My Products"
                  : "My Transactions"}
              </h1>
              {selectedMenu === Menu.Products && (
                <>
                  <Link to={"/new-product"} className={`btn hidden md:block`}>
                    Create New Product
                  </Link>
                  <Link to={"/new-product"} className={`md:hidden`}>
                    <AddIcon className={`w-8 aspect-square`} />
                  </Link>
                </>
              )}
            </div>

            {/*  Content List Section */}
            {selectedMenu === Menu.Products ? (
              <MyProductList />
            ) : (
              <MyTransactionList />
            )}
          </div>
        </section>
      </article>
    </main>
  );
};

export default AccountPage;
