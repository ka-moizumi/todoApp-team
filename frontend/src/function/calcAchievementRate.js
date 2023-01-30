export const calcAchievementRate = (chartData) => {
  return `${Math.trunc(
    (chartData.completeTodos /
      (chartData.completeTodos + chartData.incompleteTodos)) *
      100
  )} %`;
};
