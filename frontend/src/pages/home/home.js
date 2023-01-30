import React, { useMemo } from "react";
import styled from "styled-components";
import { SWrapper } from "../create/create";
import { AllChart } from "./allChart";
import { TodayChart } from "./todayChart";
import { SErrorMessage } from "../login/Login";
import { rateOfAcheivement } from "../../function/rateOfAcheivement";
import { useCountTodos } from "../../hooks/useCountTodos";

export const Home = () => {
  const userData = useMemo(() => {
    return JSON.parse(sessionStorage.getItem("userData"));
  }, []);

  const { allChartData, todayChartData, errorMessage } =
    useCountTodos(userData);

  return (
    <SWrapper width={"600px"}>
      {errorMessage && <SErrorMessage>{errorMessage}</SErrorMessage>}
      <SChartWapper>
        {allChartData[0] === 0 &&
        allChartData[1] === 0 &&
        allChartData[2] === 0 ? (
          <>
            <SChartTitle>全てのTodo</SChartTitle>
            <SNoneChartmessage>なし</SNoneChartmessage>
          </>
        ) : (
          <AllChart data={allChartData} />
        )}
      </SChartWapper>
      <SChartWapper>
        {todayChartData[0] === 0 && todayChartData[1] === 0 ? (
          <>
            <SChartTitle>今日のTodo</SChartTitle>
            <SNoneChartmessage>なし</SNoneChartmessage>
          </>
        ) : (
          <>
            <TodayChart data={todayChartData} />
            <SRateOfAcheivement>
              {rateOfAcheivement(todayChartData)}
            </SRateOfAcheivement>
          </>
        )}
      </SChartWapper>
    </SWrapper>
  );
};

export const SChartWapper = styled.div`
  margin-top: 24px;
  width: 500px;
  height: 500px;
  display: inline-block;
  vertical-align: top;
  position: relative;
`;

const SChartTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #666;
`;

const SNoneChartmessage = styled.div`
  font-size: 24px;
  margin-top: 200px;
`;

const SRateOfAcheivement = styled.span`
  font-size: 36px;
  color: #666;
  position: absolute;
  top: 270px;
  left: 215px;
`;
