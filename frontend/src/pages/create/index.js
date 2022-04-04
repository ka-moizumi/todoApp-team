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

  return (
    <SNewTodos>
      <h1>Todo新規作成</h1>
      <SInputArea>
        <SInput placeholder="Todoを入力" value={text} onChange={onChange} />
        <SInputButton onClick={onClickAdd}>作成</SInputButton>
        {text == false && <SError>※Todoを入力してください</SError>}
      </SInputArea>
      <STodosArea>
        <STodos>
          {todos.map((todo) => {
            return <li>{todo}</li>;
          })}
        </STodos>
      </STodosArea>
    </SNewTodos>
  );
};

const SNewTodos = styled.div`
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

const SInputButton = styled.button`
  margin-left: 6px;
  padding: 3px 8px;
  border-radius: 8px;
  border: none;
  backgroud-color: #dcdcdc;
  outline: none;
  &:hover {
    cursor: pointer;
    background-color: #808080;
    color: #ffffff;
  }
`;

const SError = styled.p`
  margin: 4px 2px;
  color: red;
`;

const STodosArea = styled.div`
  width: 400px;
  height: auto !important;
  height: 0px;
  min-height: 50px;
  background-color: #dcdcdc;
  margin: 6px auto;
  padding: 1px;
  border-radius: 10px;
`;

const STodos = styled.ul`
  text-align: left;
`;
