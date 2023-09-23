import AccountIcon from "../components/icons/AccountIcon.tsx";
import { useGetMe } from "../hooks/Auth.tsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import MyProductList from "../components/account/MyProductList.tsx";

enum Menu {
  Products,
  Transactions,
}

const AccountPage = () => {
  const getMe = useGetMe();
  const [selectedMenu, setSelectedMenu] = useState<Menu>(Menu.Products);

  return (
    <main className={`flex-1 flex justify-center py-16`}>
      <article className={`w-1/2 h-[500px] flex flex-col gap-4`}>
        {/*    Account Info Section */}
        <section className={`flex border-2 rounded shadow p-8`}>
          <div className={"flex justify-center items-center px-16"}>
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
          <div className={`flex gap-4`}>
            <button
              className={`btn flex-1 bg-primary border-2 ${
                selectedMenu === Menu.Products && "bg-secondary border-none"
              }`}
              onClick={() => setSelectedMenu(Menu.Products)}
            >
              My Products
            </button>
            <button
              className={`btn flex-1 bg-primary border-2 ${
                selectedMenu === Menu.Transactions && "bg-secondary border-none"
              }`}
              onClick={() => setSelectedMenu(Menu.Transactions)}
            >
              My Transactions
            </button>
          </div>

          {/*  Menu Content */}
          <div className={`flex flex-col`}>
            {/* Title Section */}
            <div className={`flex border-b-2 border-accent pb-2`}>
              <h1 className={`flex-1 text-4xl font-bold`}>
                {selectedMenu === Menu.Products
                  ? "My Products"
                  : "My Transactions"}
              </h1>
              {selectedMenu === Menu.Products && (
                <Link to={"/new-product"} className={`btn`}>
                  Create New Product
                </Link>
              )}
            </div>

            {/*  Content List Section */}
            <MyProductList />
          </div>
        </section>
      </article>
    </main>
  );
};

export default AccountPage;