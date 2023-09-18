import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetMe } from "../hooks/Auth.tsx";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const getMe = useGetMe();

  useEffect(() => {
    getMe.fetchData();
  }, []);

  useEffect(() => {
    if (!getMe.data.userId && getMe.isInit)
      navigate("/login", { replace: true });
  }, [getMe.data.userId, getMe.isInit]);

  if (getMe.isFetching)
    return (
      <main className={`flex-1 flex justify-center items-center`}>
        <p className={`text-4xl font-bold`}>Loading...</p>;
      </main>
    );

  return <Outlet />;
};

export default PrivateRoute;
