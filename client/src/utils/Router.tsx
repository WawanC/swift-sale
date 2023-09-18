import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage.tsx";
import NewProductPage from "../pages/NewProductPage.tsx";
import ProductDetailPage from "../pages/ProductDetailPage.tsx";
import EditProductPage from "../pages/EditProductPage.tsx";
import RegisterPage from "../pages/RegisterPage.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import PrivateRoute from "../guards/PrivateRoute.tsx";
import PublicRoute from "../guards/PublicRoute.tsx";
import FreeRoute from "../guards/FreeRoute.tsx";
import CartPage from "../pages/CartPage.tsx";
import TransactionsPage from "../pages/TransactionsPage.tsx";

export const router = createBrowserRouter([
  {
    element: <FreeRoute />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/products/:productId",
        element: <ProductDetailPage />,
      },
    ],
  },

  {
    element: <PublicRoute />,
    children: [
      { path: "/register", element: <RegisterPage /> },
      { path: "/login", element: <LoginPage /> },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/new-product",
        element: <NewProductPage />,
      },
      { path: "/edit-product/:productId", element: <EditProductPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/transactions", element: <TransactionsPage /> },
    ],
  },
]);
