import { FC, ReactNode } from "react";
import NavBar from "./NavBar.tsx";

type Props = {
  children: ReactNode;
};

const PageLayout: FC<Props> = (props) => {
  return (
    <>
      <NavBar />
      <>{props.children}</>
    </>
  );
};

export default PageLayout;
