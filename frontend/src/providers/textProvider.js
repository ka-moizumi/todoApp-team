import { createContext, useState } from "react";

export const TextContext = createContext({});

export const TextProvider = (props) => {
  const { children } = props;
  const today = new Date();
  const [startDate, setStartDate] = useState(today);

  return (
    <TextContext.Provider
      value={{
        today,
        startDate,
        setStartDate,
      }}
    >
      {children}
    </TextContext.Provider>
  );
};
