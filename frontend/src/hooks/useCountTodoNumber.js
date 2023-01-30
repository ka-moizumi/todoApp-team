import { useCallback, useEffect, useState } from "react";
import { getChartData } from "../api/api";
import { groupTodosByDeadline } from "../function/groupTodosByDeadline";
import { exportedErrorMessage } from "../pages/common/constant";

// Todoの数を取得
export const useCountTodoNumber = (userData) => {
  const [allChartData, setAllChartData] = useState([0, 0, 0]);
  const [todayChartData, setTodayChartData] = useState([0, 0]);

  const [errorMessage, setErrorMessage] = useState();

  // Todoの数を取得
  const countTodoNumber = useCallback(async () => {
    try {
      const chartData = await getChartData(userData.id);
      const separatedChartData = groupTodosByDeadline(chartData);

      // 返ってきたTodo数をuseStateで管理
      setAllChartData(separatedChartData[0]);
      setTodayChartData(separatedChartData[1]);
    } catch (err) {
      setErrorMessage(exportedErrorMessage.displayChart(err.response.status));
    }
  }, [userData]);

  useEffect(() => {
    countTodoNumber();
  }, [setTodayChartData, countTodoNumber]);

  return { allChartData, todayChartData, errorMessage };
};
