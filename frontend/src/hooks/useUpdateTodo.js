import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { editTodo } from "../api/api";
import { formatDate } from "../function/formatDate";
import { prioritySelect } from "../function/prioritySelect";
import { ERROR_MESSAGES } from "../pages/common/constant";

export const useUpdateTodo = (content, detail, startDate, today, id) => {
  const history = useHistory();
  const [updateErrorMessage, setErrorMessage] = useState();
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  const onClickUpdate = useCallback(async () => {
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
      history.goBack();
    } catch (err) {
      setErrorMessage(ERROR_MESSAGES.updateTodo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, detail, startDate, today, id]);
  return [onClickUpdate, updateErrorMessage];
};
