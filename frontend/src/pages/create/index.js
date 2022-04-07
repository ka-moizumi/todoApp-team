import React, { useState } from "react";
import styled from "styled-components";

export const Create = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  const onChange = (e) => setText(e.target.value);
  const onClickAdd = () => {
    if (text === "") {
      return false;
    } else {
      setTodos([...todos, text]);
    }
    setText("");
  };

  const onClickDelete = (index) => {
    todos.splice(index, 1);
    setTodos([...todos]);
  };

  const onClickClear = () => {
    setTodos([]);
  };

  const onClickEdit = (index) => {
    console.log(todos[index]);
  };

  return (
    <SWrapper>
      <h1>Todo新規作成</h1>
      <SInputArea>
        <SInput placeholder="Todoを入力" value={text} onChange={onChange} />
        <SInputButton onClick={onClickAdd}>作成</SInputButton>
        <SClearButton onClick={onClickClear}>全件削除</SClearButton>
        {text === "" && <SError>※Todoを入力してください</SError>}
      </SInputArea>
      <STodosArea>
        <STodos>
          {todos.map((todo, index) => {
            return (
              <STodo key={index}>
                {todo}
                <SDeleteButton onClick={() => onClickDelete(index)}>
                  ×
                </SDeleteButton>
                <SEditButton onClick={() => onClickEdit(index)}>
                  編集
                </SEditButton>
              </STodo>
            );
          })}
        </STodos>
      </STodosArea>
    </SWrapper>
  );
};

export const SWrapper = styled.div`
  margin: 6px;
`;

const SInputArea = styled.div`
  display: inline-block;
`;

const SInput = styled.input`
  padding: 3px 10px;
  border-radius: 8px;
  border: 1px solid;
`;

const SBaseButton = styled.button`
  margin-left: 6px;
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

const SInputButton = styled(SBaseButton)``;

const SClearButton = styled(SBaseButton)`
  color: #e72035;
  &:hover {
    background-color: #e72035;
    color: #ffffff;
  }
`;

const SEditButton = styled(SBaseButton)``;

const SError = styled.p`
  margin: 4px 2px;
  color: #e72035;
`;

export const STodosArea = styled.div`
  width: 400px;
  height: auto !important;
  height: 0px;
  min-height: 50px;
  background-color: #dcdcdc;
  margin: 6px auto;
  padding: 1px;
  border-radius: 10px;
`;

export const STodos = styled.ul`
  text-align: left;
`;

export const STodo = styled.li`
  margin-top: 8px;
`;

export const SDeleteButton = styled.button`
  color: #e72035;
  padding: 4px 8px;
  margin-left: 12px;
  border-radius: 100px;
  border: none;
  outline: none;
  &:hover {
    cursor: pointer;
    color: #ffffff;
    background-color: #e72035;
  }
`;
