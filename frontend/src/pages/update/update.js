import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { deleteTodo, editTodo } from "../../api/api";
import {
  SIndex,
  SInput,
  SInputArea,
  SInputItems,
  SInputText,
  SInputTitile,
  SPriority,
  STitle,
  SWrapper,
} from "../create/create";
import { SDeleteButton, SPrimaryButton } from "../list/list";

export const Update = () => {
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();

  const [text, setText] = useState("");
  const [contentText, setContentText] = useState("");

  const onTitleChange = (e) => setText(e.target.value);
  const onContentChange = (e) => setContentText(e.target.value);

  const onClickUpdate = async () => {
    if (text === "" || contentText === "") return;
    await editTodo(text, contentText, id);
    history.goBack();
  };

  const onClickDelete = async () => {
    await deleteTodo(id);
    history.goBack();
  };

  return (
    <SWrapper>
      <h1>Todo更新</h1>
      <SInputArea>
        <SIndex>
          <STitle>{id} Update</STitle>
        </SIndex>
        <SInputItems>
          <SInput>
            <SInputTitile>title</SInputTitile>
            <SInputText
              placeholder={`${location.state.title}`}
              name="title"
              value={text}
              onChange={onTitleChange}
            />
          </SInput>
          <SInput>
            <SInputTitile>content</SInputTitile>
            <SInputText
              placeholder={`${location.state.content}`}
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
        <SBackButton onClick={() => history.goBack()}>戻る</SBackButton>
        <SDeleteButton onClick={() => onClickDelete()}>削除</SDeleteButton>
        <SUpdateButton onClick={() => onClickUpdate()}>更新</SUpdateButton>
      </SInputArea>
    </SWrapper>
  );
};

const SBackButton = styled(SPrimaryButton)`
  margin-right: 70%;
`;

const SUpdateButton = styled(SPrimaryButton)`
  color: #ffffff;
  background-color: #37a34a;
  &:hover {
    cursor: pointer;
    background-color: #89c997;
  }
`;
