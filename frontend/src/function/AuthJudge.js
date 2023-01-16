import { Redirect } from "react-router-dom";
import { useContext } from "react";
import { TextContext } from "../providers/textProvider";

export const AuthJudge = ({ children }) => {
  const { isAuth } = useContext(TextContext);
  return isAuth ? <>{children}</> : <Redirect to={{ pathname: "/" }} />;
};
