import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetMe } from "../hooks/Auth.tsx";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const getMe = useGetMe();

  useEffect(() => {
    if (getMe.error) navigate("/login");
  }, [getMe.error]);

  return <Outlet />;
};

export default PrivateRoute;
