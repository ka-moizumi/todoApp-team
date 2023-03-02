import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { deleteTodo } from "../api/api";
import { ERROR_MESSAGES } from "../pages/common/constant";

export const useDeleteTodo = (id) => {
  const [deleteErrorMessage, setErrorMessage] = useState();
  const history = useHistory();

  const onClickDelete = useCallback(async () => {
    try {
      await deleteTodo(id);
      history.goBack();
    } catch (err) {
      setErrorMessage(ERROR_MESSAGES.deleteTodos);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return [onClickDelete, deleteErrorMessage];
};
