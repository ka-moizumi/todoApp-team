import React, { useContext, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { TextContext } from "../../providers/textProvider";
import { SIndex, SInputArea, STitle, SWrapper } from "../create/create";
import { SDeleteButton } from "../list/list";
import { TodoInputArea } from "../common/TodoInputArea";
import { useInput } from "../../hooks/useInput";
import { SPrimaryButton } from "../list/TodoTabArea";
import { SErrorMessage } from "../login/Login";
import { CONSTANT_DATA } from "./constant";
import { useUpdateTodo } from "../../hooks/useUpdateTodo";
import { useDeleteTodo } from "../../hooks/useDeleteTodo";

export const Update = () => {
  const history = useHistory();
  const location = useLocation();
  const { today, startDate, setStartDate } = useContext(TextContext);
  const { id } = useParams();

  const userData = JSON.parse(sessionStorage.getItem("userData"));

  const [content, contentOnChange] = useInput();
  const [detail, detailOnChange] = useInput();

  const [onClickDelete, deleteErrorMessage, setDeleteErrorMessage] =
    useDeleteTodo(id);

  const [onClickUpdate, updateErrorMessage, setUpdateErrorMessage] =
    useUpdateTodo(content, detail, startDate, today, id);

  const transitionAfterDelete = async () => {
    try {
      await onClickDelete();
      history.goBack();
    } catch (err) {
      setTimeout(() => {
        setDeleteErrorMessage();
      }, 3000);
    }
  };

  const transitionAfterUpdate = async () => {
    try {
      if (content === "" || detail === "") return;
      await onClickUpdate(userData);
      history.push(`/list/${userData.id}`);
    } catch (err) {
      setTimeout(() => {
        setUpdateErrorMessage();
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
      {updateErrorMessage && (
        <SErrorMessage>{updateErrorMessage}</SErrorMessage>
      )}
      {deleteErrorMessage && (
        <SErrorMessage>{deleteErrorMessage}</SErrorMessage>
      )}
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
        <SBackButton onClick={history.goBack}>
          {CONSTANT_DATA.display.back}
        </SBackButton>
        <SDeleteButton onClick={transitionAfterDelete}>
          {CONSTANT_DATA.display.delete}
        </SDeleteButton>
        <SUpdateButton onClick={transitionAfterUpdate}>
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
