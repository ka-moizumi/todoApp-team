import { createContext, useState } from "react";

export const TextContext = createContext({});

export const TextProvider = (props) => {
  const { children } = props;
  const today = new Date();
  const [startDate, setStartDate] = useState(today);

  const [isAuth, setIsAuth] = useState(false);

  const login = (userData) => {
    sessionStorage.setItem("userData", JSON.stringify(userData));
    setIsAuth(true);
  };

  const logOut = () => {
    sessionStorage.clear();
    setIsAuth(false);
  };

  return (
    <TextContext.Provider
      value={{
        today,
        startDate,
        setStartDate,
        isAuth,
        setIsAuth,
        login,
        logOut,
      }}
    >
      {children}
    </TextContext.Provider>
  );
};
