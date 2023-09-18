import { Link } from "react-router-dom";
import AccountIcon from "../icons/AccountIcon.tsx";
import CartIcon from "../icons/CartIcon.tsx";
import LogoutIcon from "../icons/LogoutIcon.tsx";
import { useGetMe, useLogout } from "../../hooks/Auth.tsx";

const NavBar = () => {
  const getMe = useGetMe();
  const logout = useLogout();

  return (
    <nav
      className={`px-16 py-2 w-full bg-accent text-primary flex items-center`}
    >
      <h1 className={`text-2xl font-bold`}>SwiftSale</h1>
      <div className={`flex-1 px-16 flex justify-center`}>
        <input
          type="text"
          className={`w-1/2 rounded text-xl p-1 px-4 text-accent outline-none`}
          placeholder={"Search Products..."}
        />
      </div>
      <ul className={"text-xl flex gap-8 items-center"}>
        {!getMe.data.userId ? (
          <div className={`flex gap-8`}>
            <Link
              to={"/login"}
              className={`text-secondary underline-offset-8 hover:text-primary hover:underline`}
            >
              Login
            </Link>
            <Link
              to={"/register"}
              className={`text-secondary underline-offset-8 hover:text-primary hover:underline`}
            >
              Register
            </Link>
          </div>
        ) : (
          <>
            <div className={`flex gap-4`}>
              <Link to={"/account"}>
                <AccountIcon
                  className={"w-8 h-8 stroke-secondary hover:stroke-primary"}
                />
              </Link>
              <Link to={"/cart"} className={`relative`}>
                <div
                  className={`w-6 aspect-square absolute -top-2 -right-2 
                  bg-primary rounded-full text-accent
                  flex justify-center items-center text-sm`}
                >
                  3
                </div>
                <CartIcon
                  className={"w-8 h-8 stroke-secondary hover:stroke-primary"}
                />
              </Link>
            </div>
            <div className={"w-1 h-8 border-r-2 border-secondary"} />
            <button onClick={() => logout.mutate()}>
              <LogoutIcon
                className={`w-8 h-8 stroke-secondary hover:stroke-primary`}
              />
            </button>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
