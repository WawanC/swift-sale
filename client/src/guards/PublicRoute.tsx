import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetMe } from "../hooks/Auth.tsx";

const PublicRoute = () => {
  const navigate = useNavigate();
  const getMe = useGetMe();

  useEffect(() => {
    if (getMe.data) navigate("/");
  }, [getMe.data]);

  return <Outlet />;
};

export default PublicRoute;
