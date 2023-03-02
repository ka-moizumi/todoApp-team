import React, { useContext } from "react";
import styled from "styled-components";
import { TextContext } from "../../providers/textProvider";
import { Datepick } from "./datepick";

export const TodoInputArea = (props) => {
  const {
    contentPlaceholder,
    detailPlaceholder,
    content,
    detail,
    contentOnChange,
    detailOnChange,
  } = props;

  const { today, startDate, setStartDate } = useContext(TextContext);

  return (
    <SInputItems>
      <SInput>
        <SInputTitile>内容</SInputTitile>
        <SInputText
          placeholder={contentPlaceholder}
          name="title"
          value={content}
          onChange={contentOnChange}
        />
      </SInput>
      <SInput>
        <SInputTitile>詳細</SInputTitile>
        <SInputText
          placeholder={detailPlaceholder}
          name="content"
          value={detail}
          onChange={detailOnChange}
        />
      </SInput>
      <SInput>
        <SInputTitile>期限</SInputTitile>
        <SDatepicker>
          <Datepick
            today={today}
            startDate={startDate}
            setStartDate={setStartDate}
          />
        </SDatepicker>
      </SInput>
    </SInputItems>
  );
};

export const SInputItems = styled.div`
  margin-top: 80px;
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

export const SDatepicker = styled.span`
  margin-left: 10px;
`;
