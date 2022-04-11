import React, { useState } from "react";
import styled from "styled-components";

export const Create = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState("");

  const [editOpen, setEditOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(0);

  const onChange = (e) => setText(e.target.value);
  const onChangeEdit = (e) => setEdit(e.target.value);

  const onClickAdd = () => {
    if (text === "") {
      return false;
    } else {
      setTodos([...todos, text]);
    }
    setText("");
  };

  const onClickConfirm = (index) => {
    if (edit === "") {
      return setEditOpen(!editOpen);
    } else {
      todos.splice(index, 1, edit);
    }
    setEditOpen(!editOpen);
    setEdit("");
  };

  const onClickDelete = (index) => {
    todos.splice(index, 1);
    setTodos([...todos]);
    if (editOpen) {
      setEditOpen(!editOpen);
    }
  };

  const onClickClear = () => {
    setTodos([]);
    if (editOpen) {
      setEditOpen(!editOpen);
    }
  };

  const onClickEdit = (index) => {
    setEditIndex(index);
    setEditOpen(!editOpen);
  };

  const editSwitch = (todo, index) => {
    if (editOpen && editIndex === index) {
      return (
        <>
          <SEditInput placeholder={todo} value={edit} onChange={onChangeEdit} />
          <SConfirmButton onClick={() => onClickConfirm(index)}>
            ○
          </SConfirmButton>
        </>
      );
    } else {
      return (
        <>
          {todo}
          <SEditButton onClick={() => onClickEdit(index)}>編集</SEditButton>
        </>
      );
    }
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
                {editSwitch(todo, index)}
                <SDeleteButton onClick={() => onClickDelete(index)}>
                  ×
                </SDeleteButton>
              </STodo>
            );
          })}
        </STodos>
      </STodosArea>
    </SWrapper>
  );
};

const SWrapper = styled.div`
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

const SEditInput = styled(SInput)``;

const SPrimaryButton = styled.button`
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

const SInputButton = styled(SPrimaryButton)``;

const SEditButton = styled(SPrimaryButton)``;

const SClearButton = styled(SPrimaryButton)`
  color: #e72035;
  &:hover {
    background-color: #e72035;
    color: #ffffff;
  }
`;

const SError = styled.p`
  margin: 4px 2px;
  color: #e72035;
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

const STodo = styled.li`
  margin-top: 8px;
`;

const SSecondaryButton = styled.button`
  padding: 4px 8px;
  margin-left: 12px;
  border-radius: 100px;
  border: none;
  outline: none;
  &:hover {
    cursor: pointer;
  }
`;

const SDeleteButton = styled(SSecondaryButton)`
  color: #e72035;
  &:hover {
    color: #ffffff;
    background-color: #e72035;
  }
`;

const SConfirmButton = styled(SSecondaryButton)`
  color: #37a34a;
  &:hover {
    color: #ffffff;
    background-color: #37a34a;
  }
`;
