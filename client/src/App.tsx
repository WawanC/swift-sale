import { RouterProvider } from "react-router-dom";
import { router } from "./utils/Router.tsx";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
