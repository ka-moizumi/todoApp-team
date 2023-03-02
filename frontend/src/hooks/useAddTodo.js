import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { addTodo } from "../api/api";
import { formatDate } from "../function/formatDate";
import { prioritySelect } from "../function/prioritySelect";
import { ERROR_MESSAGES } from "../pages/common/constant";

export const useAddTodo = (content, detail, startDate, today) => {
  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState();
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  const onClickAdd = useCallback(async () => {
    try {
      if (content === "" || detail === "") return;
      await addTodo(
        content,
        detail,
        prioritySelect(startDate, today),
        userData.id,
        formatDate(startDate)
      );
      history.push(`/list/${userData.id}`);
    } catch (err) {
      setErrorMessage(ERROR_MESSAGES.registerTodo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, detail, startDate, userData.id, today]);

  return [onClickAdd, errorMessage];
};
