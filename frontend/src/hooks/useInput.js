import { useCallback, useState } from "react";

export const useInput = () => {
  const [text, setText] = useState("");
  const textOnChange = useCallback((e) => setText(e.target.value), []);
  return { text, textOnChange };
};
