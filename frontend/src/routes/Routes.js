import { useContext } from "react";
import { Header } from "../pages/header/header";
import { TextContext } from "../providers/textProvider";
import { MainPages } from "./MainPages";

export const Routes = () => {
  const { isAuth } = useContext(TextContext);
  return (
    <>
      {isAuth ? <Header /> : null}
      <MainPages />
    </>
  );
};
