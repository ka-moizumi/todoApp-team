import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getTodos, clearTodos, completionChange } from "../../api/api";
import { SIndex, STitle, SWrapper } from "../create/create";
import { ListTabs } from "./listTabs";

export const List = () => {
  const history = useHistory();
  const [todos, setTodos] = useState([]);

  const userData = JSON.parse(sessionStorage.getItem("userData"));

  const resTodos = () => {
    getTodos(userData["id"]).then((res) => {
      setTodos(res.data);
    });
  };

  const onClickClear = async () => {
    await clearTodos(userData["id"]).then(() => {
      resTodos();
    });
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
    await completionChange(!todo.completion, todo.id);
    resTodos();
  };

  useEffect(() => {
    resTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SWrapper>
      <h1>Todoリスト一覧</h1>
      <STodosArea>
        <SIndex>
          <STitle>List</STitle>
          <SDeleteButton onClick={onClickClear}>全件削除</SDeleteButton>
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
