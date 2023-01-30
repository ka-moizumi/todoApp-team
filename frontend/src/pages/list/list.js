import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getTodos, clearTodos, completionChange } from "../../api/api";
import { ERROR_MESSAGES } from "../common/constant";
import { SIndex, STitle, SWrapper } from "../create/create";
import { SErrorMessage } from "../login/Login";
import { CONSTANT_DATA } from "./constant";
import { ListTabs } from "./listTabs";

export const List = () => {
  const history = useHistory();
  const [todos, setTodos] = useState([]);
  const [errorMessage, setErrorMessage] = useState();

  const userData = JSON.parse(sessionStorage.getItem("userData"));

  const resTodos = async () => {
    try {
      const result = await getTodos(userData.id);
      setTodos(result.data);
    } catch (err) {
      setErrorMessage(ERROR_MESSAGES.getTodos(err.response.status));
    }
  };

  const onClickClear = async () => {
    try {
      await clearTodos(userData.id);
      resTodos();
    } catch (err) {
      setErrorMessage(ERROR_MESSAGES.deleteTodos(err.response.status));
    }
  };

  const onClickEdit = (todo) => {
    history.push({
      pathname: `/update/${todo.id}`,
      state: {
        title: todo.title,
        content: todo.content,
        priprity: todo.priority,
        deadline: todo.deadline,
      },
    });
  };

  const onClickCompleteChange = async (todo) => {
    try {
      await completionChange(!todo.completion, todo.id);
      resTodos();
    } catch (err) {
      setErrorMessage(ERROR_MESSAGES.changeStatus(err.response.status));
    }
  };

  useEffect(() => {
    resTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SWrapper>
      <h1>Todoリスト一覧</h1>
      {errorMessage && <SErrorMessage>{errorMessage}</SErrorMessage>}
      <STodosArea>
        <SIndex>
          <STitle>{CONSTANT_DATA.display.title}</STitle>
          <SDeleteButton onClick={onClickClear}>
            {CONSTANT_DATA.display.clear}
          </SDeleteButton>
        </SIndex>
        <ListTabs
          todos={todos}
          onClickCompleteChange={onClickCompleteChange}
          onClickEdit={onClickEdit}
          setTodos={setTodos}
        />
      </STodosArea>
    </SWrapper>
  );
};

const STodosArea = styled.div`
  width: 70%;
  min-height: 300px;
  background-color: #ffffff;
  margin: 30px auto;
  padding: 10px 20px;
  border: 1px solid #bcc7d7;
  border-radius: 8px;
`;

const SPrimaryButton = styled.button`
  margin: 5px 10px;
  padding: 3px 8px;
  border-radius: 8px;
  border: none;
  background-color: #ededed;
  outline: none;
  &:hover {
    cursor: pointer;
    background-color: #808080;
    color: #ffffff;
  }
`;

export const SDeleteButton = styled(SPrimaryButton)`
  color: #e72035;
  &:hover {
    background-color: #e72035;
  }
`;
