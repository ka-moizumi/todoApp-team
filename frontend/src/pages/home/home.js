import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { SWrapper } from "../create/create";
import { AllChart } from "./allChart";
import { TodayChart } from "./todayChart";
import { getTodosDate } from "../../api/api";

export const Home = () => {
  const userData = useMemo(() => {
    return JSON.parse(sessionStorage.getItem("userData"));
  }, []);

  const [allChartData, setAllChartData] = useState();
  const [todayChartData, setTodayChartData] = useState();

  // Todoの数を取得
  const countTodoNumber = useCallback(async () => {
    const resData = await getTodosDate(userData["id"]).then((res) => {
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
    });

    // 返ってきたTodo数をuseStateで管理
    setAllChartData(resData[0]);
    setTodayChartData(resData[1]);
  }, [userData]);

  useEffect(() => {
    countTodoNumber();
  }, [setTodayChartData, countTodoNumber]);

  return (
    <SWrapper width={"600px"}>
      <SChartWapper>
        <AllChart data={allChartData} />
      </SChartWapper>
      <SChartWapper>
        <TodayChart data={todayChartData} />
      </SChartWapper>
    </SWrapper>
  );
};

export const SChartWapper = styled.div`
  margin-top: 24px;
  width: 500px;
  height: 500px;
  display: inline-block;
`;
