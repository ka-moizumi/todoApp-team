export const calcAchievementRate = (chartData) => {
  return `${Math.trunc(
    (chartData.completeTodosCount /
      (chartData.completeTodosCount + chartData.incompleteTodosCount)) *
      100
  )} %`;
};
