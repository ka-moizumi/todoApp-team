import { useCallback, useState } from "react";
import { deleteTodo } from "../api/api";
import { ERROR_MESSAGES } from "../pages/common/constant";

export const useDeleteTodo = (id) => {
  const [errorMessage, setErrorMessage] = useState();

  const onClickDelete = useCallback(async () => {
    try {
      await deleteTodo(id);
    } catch (err) {
      setErrorMessage(ERROR_MESSAGES.deleteTodos);
      throw new Error();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return [onClickDelete, errorMessage, setErrorMessage];
};
