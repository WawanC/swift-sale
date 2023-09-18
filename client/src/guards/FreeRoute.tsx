import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useGetMe } from "../hooks/Auth.tsx";
import PageLayout from "../components/layouts/PageLayout.tsx";

const FreeRoute = () => {
  const getMe = useGetMe();

  useEffect(() => {
    getMe.fetchData();
  }, []);

  if (getMe.isFetching)
    return (
      <main className={`flex-1 flex justify-center items-center`}>
        <p className={`text-4xl font-bold`}>Loading...</p>;
      </main>
    );

  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
};

export default FreeRoute;
