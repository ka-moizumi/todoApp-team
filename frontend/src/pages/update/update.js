import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { deleteTodo, editTodo } from "../../api/api";
import { TextContext } from "../../providers/textProvider";
import { SIndex, SInputArea, STitle, SWrapper } from "../create/create";
import { SDeleteButton } from "../list/list";
import { formatDate } from "../../function/formatDate";
import { prioritySelect } from "../../function/prioritySelect";
import { TodoInputArea } from "../common/TodoInputArea";
import { useInput } from "../../hooks/useInput";
import { SPrimaryButton } from "../list/TodoTabArea";
import { SErrorMessage } from "../login/Login";
import { ERROR_MESSAGES } from "../common/constant";
import { CONSTANT_DATA } from "./constant";

export const Update = () => {
  const history = useHistory();
  const location = useLocation();

  const [content, contentOnChange] = useInput();
  const [detail, detailOnChange] = useInput();

  const { id } = useParams();

  const { today, startDate, setStartDate } = useContext(TextContext);

  const [errorMessage, setErrorMessage] = useState();
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  const onClickUpdate = async () => {
    try {
      if (content === "" || detail === "") return;
      await editTodo(
        content,
        detail,
        prioritySelect(startDate, today),
        userData.id,
        formatDate(startDate),
        id
      );
      history.goBack();
    } catch (err) {
      setErrorMessage(ERROR_MESSAGES.updateTodo(err.response.status));
    }
  };

  const onClickDelete = async () => {
    try {
      await deleteTodo(id);
      history.goBack();
    } catch (err) {
      setErrorMessage(ERROR_MESSAGES.deleteTodos(err.response.status));
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
          <STitle>
            {id} {CONSTANT_DATA.display.title}
          </STitle>
        </SIndex>
        <TodoInputArea
          contentPlaceholder={`${location.state.title}`}
          content={content}
          contentOnChange={contentOnChange}
          detailPlaceholder={`${location.state.content}`}
          detail={detail}
          detailOnChange={detailOnChange}
        />
        <SBackButton onClick={() => history.goBack()}>
          {CONSTANT_DATA.display.back}
        </SBackButton>
        <SDeleteButton onClick={() => onClickDelete()}>
          {CONSTANT_DATA.display.delete}
        </SDeleteButton>
        <SUpdateButton onClick={() => onClickUpdate()}>
          {CONSTANT_DATA.display.update}
        </SUpdateButton>
      </SInputArea>
    </SWrapper>
  );
};

const SBackButton = styled(SPrimaryButton)`
  margin-right: 60%;
`;

const SUpdateButton = styled(SPrimaryButton)`
  color: #ffffff;
  background-color: #37a34a;
  &:hover {
    cursor: pointer;
    background-color: #89c997;
  }
`;
