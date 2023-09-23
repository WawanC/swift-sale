import { Link } from "react-router-dom";
import AccountIcon from "../icons/AccountIcon.tsx";
import CartIcon from "../icons/CartIcon.tsx";
import LogoutIcon from "../icons/LogoutIcon.tsx";
import { useGetMe, useLogout } from "../../hooks/Auth.tsx";
import { useGetCarts } from "../../hooks/Cart.tsx";
import { useCallback, useState } from "react";
import MenuIcon from "../icons/MenuIcon.tsx";

const NavBar = () => {
  const getMe = useGetMe();
  const logout = useLogout();
  const getCarts = useGetCarts();

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const openSideMenu = useCallback(
    () => setIsSideMenuOpen(true),
    [setIsSideMenuOpen],
  );

  const closeSideMenu = useCallback(
    () => setIsSideMenuOpen(false),
    [setIsSideMenuOpen],
  );

  return (
    <nav
      className={`px-16 py-2 bg-accent text-primary 
      flex items-center justify-center relative`}
    >
      {/* Side Menu Button Icon */}
      <button className={`absolute left-4 md:hidden`} onClick={openSideMenu}>
        <MenuIcon className={"w-8 aspect-square"} />
      </button>

      {/* App Logo */}
      <Link to={"/"} className={`text-2xl font-bold`}>
        SwiftSale
      </Link>

      {/* Search Bar */}
      <div className={`flex-1 px-16 hidden md:flex justify-center `}>
        <input
          type="text"
          className={`min-w-[50%] rounded text-xl p-1 px-4 text-accent outline-none`}
          placeholder={"Search Products..."}
        />
      </div>

      {/* Side Menu Backdrop Element */}
      {isSideMenuOpen && (
        <div
          className={`fixed md:hidden inset-0 bg-black opacity-50 z-10`}
          onClick={closeSideMenu}
        />
      )}
      {/* Actions Menu */}
      <ul
        className={`text-xl text-center 
        md:flex md:static md:flex-row md:w-auto md:h-fit md:py-4
        ${
          isSideMenuOpen ? "flex" : "hidden"
        } bg-accent left-0 top-0 bottom-0 z-20
        fixed flex-col gap-8 w-[50%] px-8 py-32 h-screen`}
      >
        {!getMe.data.userId ? (
          <>
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
          </>
        ) : (
          <>
            <div className={`flex flex-col md:flex-row gap-4`}>
              <Link to={"/account"}>
                <span className={`md:hidden`}>My Account</span>
                <AccountIcon
                  className={
                    "w-8 h-8 stroke-secondary hover:stroke-primary hidden md:block"
                  }
                />
              </Link>
              <Link to={"/cart"} className={`relative`}>
                {getCarts.totalCount > 0 && (
                  <div
                    className={`w-6 aspect-square absolute -top-2 -right-2 
                  bg-primary rounded-full text-accent
                  flex justify-center items-center text-sm`}
                  >
                    {getCarts.totalCount}
                  </div>
                )}
                <span className={`md:hidden`}>My Cart</span>
                <CartIcon
                  className={
                    "w-8 h-8 stroke-secondary hover:stroke-primary hidden md:block"
                  }
                />
              </Link>
            </div>
            <div
              className={"w-1 h-8 border-r-2 border-secondary hidden md:block"}
            />
            <button onClick={() => logout.mutate()}>
              <span className={`md:hidden`}>Logout</span>
              <LogoutIcon
                className={`w-8 h-8 stroke-secondary hover:stroke-primary hidden md:block`}
              />
            </button>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
