import { useCallback, useState } from "react";
import { addTodo } from "../api/api";
import { formatDate } from "../function/formatDate";
import { prioritySelect } from "../function/prioritySelect";
import { ERROR_MESSAGES } from "../pages/common/constant";

export const useAddTodo = (content, detail, startDate, today) => {
  const [errorMessage, setErrorMessage] = useState();

  const onClickAdd = useCallback(
    async (userData) => {
      try {
        await addTodo(
          content,
          detail,
          prioritySelect(startDate, today),
          userData.id,
          formatDate(startDate)
        );
      } catch (err) {
        setErrorMessage(ERROR_MESSAGES.registerTodo);
        throw new Error();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [content, detail, startDate, today]
  );

  return [onClickAdd, errorMessage, setErrorMessage];
};
