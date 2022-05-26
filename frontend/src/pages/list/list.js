import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getTodos, clearTodos } from "../../api/api";
import { SIndex, STitle, SWrapper } from "../create/create";

export const List = () => {
  const history = useHistory();
  const [todos, setTodos] = useState([]);

  const resTodos = () => {
    getTodos().then((res) => {
      setTodos(res.data);
    });
  };

  useEffect(() => {
    resTodos();
  }, []);

  const onClickClear = async () => {
    await clearTodos();
    resTodos();
  };

  const onClickEdit = (todo) => {
    history.push({
      pathname: `/update/${todo.id}`,
      state: {
        title: todo.title,
        content: todo.content,
        priprity: todo.priority,
      },
    });
  };

  return (
    <SWrapper>
      <h1>Todoリスト一覧</h1>
      <STodosArea>
        <SIndex>
          <STitle>List</STitle>
          <SDeleteButton onClick={onClickClear}>全件削除</SDeleteButton>
        </SIndex>
        <STodos>
          <thead>
            <SHeaderTr>
              <SIdTh>id</SIdTh>
              <STitleTh>タイトル</STitleTh>
              <SContentTh>内容</SContentTh>
              <SPriorityTh>優先度</SPriorityTh>
              <SAdminTh>管理</SAdminTh>
            </SHeaderTr>
          </thead>
          <tbody>
            {todos.map((todo) => {
              return (
                <STodo key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.title}</td>
                  <td>{todo.content}</td>
                  <td>{todo.priority}</td>
                  <td>
                    <SEditButton onClick={() => onClickEdit(todo)}>
                      編集
                    </SEditButton>
                  </td>
                </STodo>
              );
            })}
          </tbody>
        </STodos>
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

const STodos = styled.table`
  text-align: left;
  width: 100%;
  margin: 20px 0 10px 0;
  border-collapse: collapse;
`;

const STodo = styled.tr`
  margin-top: 30px;
  :nth-child(even) {
    background-color: #bccddb;
  }
`;

export const SPrimaryButton = styled.button`
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

const SEditButton = styled(SPrimaryButton)`
  color: #fcc800;
  &:hover {
    background-color: #fcc800;
  }
`;

const SHeaderTr = styled.tr`
  border-bottom: 2px solid #8da0b6;
`;

const SIdTh = styled.th`
  width: 5%;
`;

const STitleTh = styled.th`
  width: 32%;
`;

const SContentTh = styled.th`
  width: 42%;
`;

const SPriorityTh = styled.th`
  width: 7%;
`;

const SAdminTh = styled.th`
  width: 14%;
`;
