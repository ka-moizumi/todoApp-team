export const rateOfAcheivement = (chartData) => {
  return `${Math.trunc(
    (chartData[0] / (chartData[0] + chartData[1])) * 100
  )} %`;
};
