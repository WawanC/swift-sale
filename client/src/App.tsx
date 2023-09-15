import { RouterProvider } from "react-router-dom";
import { router } from "./utils/Router.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

const App = () => {
  // useEffect(() => {
  //   privateAxios.interceptors.request.use(
  //     (res) => res,
  //     (err) => {
  //       console.log("err...");
  //       return err;
  //     },
  //   );
  // }, []);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
