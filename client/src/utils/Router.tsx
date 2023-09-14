import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage.tsx";
import NewProductPage from "../pages/NewProductPage.tsx";
import ProductDetailPage from "../pages/ProductDetailPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/new-product",
    element: <NewProductPage />,
  },
  {
    path: "/products/:productId",
    element: <ProductDetailPage />,
  },
]);
