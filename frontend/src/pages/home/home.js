import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { SWrapper } from "../create/create";
import { AllChart } from "./allChart";
import { TodayChart } from "./todayChart";
import { getTodosDate } from "../../api/api";
import { SErrorMessage } from "../login/Login";
import { exportedErrorMessage } from "../common/constant";

export const Home = () => {
  const userData = useMemo(() => {
    return JSON.parse(sessionStorage.getItem("userData"));
  }, []);

  const [allChartData, setAllChartData] = useState([0, 0, 0]);
  const [todayChartData, setTodayChartData] = useState([0, 0]);

  const [errorMessage, setErrorMessage] = useState();

  //取得したTodo数を分けて返却
  const separateData = (res) => {
    const today = new Date();
    const getData = res.data;

    // 期限ごとにTodoを分ける
    const highLimitTodos = getData.filter((num) => {
      const formatGetData = new Date(num.deadline);
      const limitTime = formatGetData.setDate(formatGetData.getDate() + 1);
      return limitTime - today < 86400000 && limitTime - today > 0;
    });

    const normalLimitTodos = getData.filter((num) => {
      const formatGetData = new Date(num.deadline);
      const limitTime = formatGetData.setDate(formatGetData.getDate() + 1);
      return limitTime - today > 86400000 && limitTime - today < 259200000;
    });

    const lowLimitTodos = getData.filter((num) => {
      const formatGetData = new Date(num.deadline);
      const limitTime = formatGetData.setDate(formatGetData.getDate() + 1);
      return limitTime - today > 259200000;
    });

    // 完了・未完了を分ける
    const completeTodos = highLimitTodos.filter((num) => {
      return num.completion === 1;
    });

    const imCompleteTodos = highLimitTodos.filter((num) => {
      return num.completion === 0;
    });

    //分けたTodo数を配列にする
    const limitTodos = [
      highLimitTodos.length,
      normalLimitTodos.length,
      lowLimitTodos.length,
    ];

    const countCompleteTodos = [completeTodos.length, imCompleteTodos.length];

    return [limitTodos, countCompleteTodos];
  };

  // Todoの数を取得
  const countTodoNumber = useCallback(async () => {
    try {
      const chartData = await getTodosDate(userData.id);
      const separatedCartData = separateData(chartData);

      // 返ってきたTodo数をuseStateで管理
      setAllChartData(separatedCartData[0]);
      setTodayChartData(separatedCartData[1]);
    } catch (err) {
      setErrorMessage(exportedErrorMessage.displayChart(err.response.status));
    }
  }, [userData]);

  useEffect(() => {
    countTodoNumber();
  }, [setTodayChartData, countTodoNumber]);

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
            <SPercentComp>
              {Math.trunc(
                (todayChartData[0] / (todayChartData[0] + todayChartData[1])) *
                  100
              )}
              %
            </SPercentComp>
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

const SPercentComp = styled.span`
  font-size: 36px;
  color: #666;
  position: absolute;
  top: 270px;
  left: 215px;
`;
