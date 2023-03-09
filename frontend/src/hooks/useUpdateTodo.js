import { useCallback, useState } from "react";
import { editTodo } from "../api/api";
import { formatDate } from "../function/formatDate";
import { prioritySelect } from "../function/prioritySelect";
import { ERROR_MESSAGES } from "../pages/common/constant";

export const useUpdateTodo = (content, detail, startDate, today, id) => {
  const [errorMessage, setErrorMessage] = useState();

  const onClickUpdate = useCallback(
    async (userData) => {
      try {
        if (content === "" || detail === "") return;
        await editTodo(
          content,
          detail,
          prioritySelect(startDate, today),
          userData.id,
          formatDate(startDate),
          id
        );
      } catch (err) {
        setErrorMessage(ERROR_MESSAGES.updateTodo);
        throw new Error();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [content, detail, startDate, today, id]
  );
  return [onClickUpdate, errorMessage, setErrorMessage];
};
