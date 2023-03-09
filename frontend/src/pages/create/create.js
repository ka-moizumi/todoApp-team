import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { TextContext } from "../../providers/textProvider";
import { TodoInputArea } from "../common/TodoInputArea";
import { useInput } from "../../hooks/useInput";
import { SErrorMessage } from "../login/Login";
import { CONSTANT_DATA } from "./constant";
import { useAddTodo } from "../../hooks/useAddTodo";
import { useHistory } from "react-router-dom";

export const Create = () => {
  const history = useHistory();
  const { today, startDate, setStartDate } = useContext(TextContext);

  const [content, contentOnChange] = useInput();
  const [detail, detailOnChange] = useInput();

  const userData = JSON.parse(sessionStorage.getItem("userData"));

  const [onClickAdd, errorMessage, setErrorMessage] = useAddTodo(
    content,
    detail,
    startDate,
    today
  );

  const transitionAfterCreate = async () => {
    if (content === "" || detail === "") return;
    try {
      await onClickAdd(userData);
      history.push(`/list/${userData.id}`);
    } catch (err) {
      setTimeout(() => {
        setErrorMessage();
      }, 3000);
    }
  };

  useEffect(() => {
    setStartDate(today);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SWrapper>
      <h1>{CONSTANT_DATA.display.header}</h1>
      {errorMessage && <SErrorMessage>{errorMessage}</SErrorMessage>}
      <SInputArea>
        <SIndex>
          <STitle>{CONSTANT_DATA.display.title}</STitle>
          <SAddButton onClick={transitionAfterCreate}>
            {CONSTANT_DATA.display.submit}
          </SAddButton>
        </SIndex>
        <TodoInputArea
          contentPlaceholder={CONSTANT_DATA.display.content}
          content={content}
          contentOnChange={contentOnChange}
          detailPlaceholder={CONSTANT_DATA.display.detail}
          detailt={detail}
          detailOnChange={detailOnChange}
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
