import React, { useMemo } from "react";
import styled from "styled-components";
import { SWrapper } from "../create/create";
import { AllChart } from "./allChart";
import { TodayChart } from "./todayChart";
import { SErrorMessage } from "../login/Login";
import { calcAchievementRate } from "../../function/calcAchievementRate";
import { useCountTodos } from "../../hooks/useCountTodos";
import { CONSTANT_DATA } from "./constant";

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
        {allChartData.highPriorityTodosCount === CONSTANT_DATA.noneTodosCount &&
        allChartData.normalPriorityTodosCount ===
          CONSTANT_DATA.noneTodosCount &&
        allChartData.lowPriorityTodosCount === CONSTANT_DATA.noneTodosCount ? (
          <>
            <SChartTitle>{CONSTANT_DATA.display.allChartTitle}</SChartTitle>
            <SNoneChartmessage>
              {CONSTANT_DATA.display.noneChartMessage}
            </SNoneChartmessage>
          </>
        ) : (
          <AllChart data={allChartData} />
        )}
      </SChartWapper>
      <SChartWapper>
        {todayChartData.incompleteTodosCount === CONSTANT_DATA.noneTodosCount &&
        todayChartData.completeTodosCount === CONSTANT_DATA.noneTodosCount ? (
          <>
            <SChartTitle>{CONSTANT_DATA.display.todayChartTitle}</SChartTitle>
            <SNoneChartmessage>
              {CONSTANT_DATA.display.noneChartMessage}
            </SNoneChartmessage>
          </>
        ) : (
          <>
            <TodayChart data={todayChartData} />
            <SRateOfAcheivement>
              {calcAchievementRate(todayChartData)}
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
