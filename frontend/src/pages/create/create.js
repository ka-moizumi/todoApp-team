import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { addTodo } from "../../api/api";
import { TextContext } from "../../providers/textProvider";
import { formatDate } from "../../function/formatDate";
import { prioritySelect } from "../../function/prioritySelect";
import { TodoInputArea } from "../common/TodoInputArea";
import { useInput } from "../../hooks/useInput";
import { SErrorMessage } from "../login/Login";
import { exportedErrorMessage } from "../common/constant";

export const Create = () => {
  const history = useHistory();

  const text = useInput();
  const contentText = useInput();

  const { today, startDate, setStartDate } = useContext(TextContext);

  const [errorMessage, setErrorMessage] = useState();

  const userData = JSON.parse(sessionStorage.getItem("userData"));

  const onClickAdd = async () => {
    try {
      if (text.text === "" || contentText.text === "") return;
      await addTodo(
        text.text,
        contentText.text,
        prioritySelect(startDate, today),
        userData["id"],
        formatDate(startDate)
      );
      history.push(`/list/${userData["id"]}`);
    } catch (err) {
      setErrorMessage(exportedErrorMessage.registerTodo(err.response.status));
    }
  };

  useEffect(() => {
    setStartDate(today);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SWrapper>
      <h1>Todo新規作成</h1>
      {errorMessage && <SErrorMessage>{errorMessage}</SErrorMessage>}
      <SInputArea>
        <SIndex>
          <STitle>Create</STitle>
          <SAddButton onClick={onClickAdd}>+</SAddButton>
        </SIndex>
        <TodoInputArea
          textPlaceholder={"Todoを入力"}
          text={text.text}
          textOnChange={text.textOnChange}
          contentTextPlaceholder={"詳細を入力"}
          contentText={contentText.text}
          contentTextOnChange={contentText.textOnChange}
        />
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

export const STitle = styled.span`
  font-weight: 700;
  margin: 5px 0 0 10px;
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
