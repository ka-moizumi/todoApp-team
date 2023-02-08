import { useCallback, useEffect, useState } from "react";
import { getTodos } from "../api/api";
import { groupTodosByDeadline } from "../function/groupTodosByDeadline";
import { ERROR_MESSAGES } from "../pages/common/constant";
import { CONSTANT_DATA } from "../pages/home/constant";

// Todoの数を取得
export const useCountTodos = (userData) => {
  const [allChartData, setAllChartData] = useState({
    highPriorityTodosCount: CONSTANT_DATA.noneTodosCount,
    normalPriorityTodosCount: CONSTANT_DATA.noneTodosCount,
    lowPriorityTodosCount: CONSTANT_DATA.noneTodosCount,
  });

  const [todayChartData, setTodayChartData] = useState({
    completeTodosCount: CONSTANT_DATA.noneTodosCount,
    incompleteTodosCount: CONSTANT_DATA.noneTodosCount,
  });

  const [errorMessage, setErrorMessage] = useState();

  // Todoの数を取得
  const countTodos = useCallback(async () => {
    try {
      const chartData = await getTodos(userData.id);
      const separatedChartData = groupTodosByDeadline(chartData);
      // 返ってきたTodo数をuseStateで管理
      setAllChartData(separatedChartData.limitTodos);
      setTodayChartData(separatedChartData.countCompleteTodos);
    } catch (err) {
      setErrorMessage(ERROR_MESSAGES.displayChart(err.response.status));
    }
  }, [userData]);

  useEffect(() => {
    countTodos();
  }, [setTodayChartData, countTodos]);

  return { allChartData, todayChartData, errorMessage };
};
