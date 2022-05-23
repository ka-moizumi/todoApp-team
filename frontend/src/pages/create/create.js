import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { addTodo } from "../../api/api";

export const Create = () => {
  const history = useHistory();
  const [text, setText] = useState("");
  const [contentText, setContentText] = useState("");

  const onTitleChange = (e) => setText(e.target.value);
  const onContentChange = (e) => setContentText(e.target.value);

  const onClickAdd = async () => {
    if (text === "" || contentText === "") {
      return false;
    } else {
      await addTodo(text, contentText);
    }
    history.push("/list");
  };

  return (
    <SWrapper>
      <h1>Todo新規作成</h1>
      <SInputArea>
        <SIndex>
          <STitle>Create</STitle>
          <SAddButton onClick={onClickAdd}>+</SAddButton>
        </SIndex>
        <SInputItems>
          <SInput>
            <SInputTitile>title</SInputTitile>
            <SInputText
              placeholder="Todoを入力"
              name="title"
              value={text}
              onChange={onTitleChange}
            />
          </SInput>
          <SInput>
            <SInputTitile>content</SInputTitile>
            <SInputText
              placeholder="詳細を入力"
              name="content"
              value={contentText}
              onChange={onContentChange}
            />
          </SInput>
          <SInput>
            <SInputTitile>priority</SInputTitile>
            <SPriority name="priority">
              <option value="1">高</option>
              <option value="2">中</option>
              <option value="3">低</option>
            </SPriority>
          </SInput>
        </SInputItems>
      </SInputArea>
    </SWrapper>
  );
};

export const SWrapper = styled.div`
  margin: 6px;
`;

export const SInputArea = styled.div`
  width: 50%;
  height: 400px;
  padding: 10px 20px;
  margin: 30px 0;
  display: inline-block;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 1px 1px 10px;
`;

export const SIndex = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #bcc7d7;
`;

export const SInputItems = styled.div`
  margin-top: 80px;
`;

export const STitle = styled.span`
  font-weight: 700;
  margin: 5px 0 0 10px;
`;

export const SInput = styled.div`
  display: flex;
  margin: 30px 0;
`;

export const SInputTitile = styled.span`
  width: 25%;
  text-align: right;
`;

export const SInputText = styled.input`
  width: 50%;
  margin-left: 10px;
  padding: 3px 10px;
  border-radius: 8px;
  border: 1px solid;
`;

export const SPriority = styled.select`
  margin-left: 10px;
  padding: 2px 1px;
  border-radius: 8px;
  border: 1px solid;
  outline: none;
`;

export const SAddButton = styled.button`
  padding: 4px 8px;
  margin: 5px 12px;
  border-radius: 100px;
  border: none;
  outline: none;
  color: #ffffff;
  background-color: #37a34a;
  &:hover {
    cursor: pointer;
    background-color: #89c997;
  }
`;
