import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { CONSTANT_DATA } from "./constant";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export const TodayChart = (props) => {
  const chartData = {
    labels: [
      CONSTANT_DATA.display.todaylabel.complete,
      CONSTANT_DATA.display.todaylabel.incomplete,
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [props.data.completeTodosCount, props.data.incompleteTodosCount],
        backgroundColor: [CONSTANT_DATA.color.blue, CONSTANT_DATA.color.red],
        borderColor: [
          CONSTANT_DATA.borderColor.blue,
          CONSTANT_DATA.borderColor.red,
        ],
        borderWidth: CONSTANT_DATA.borderWidth,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: false,
    legend: {
      position: CONSTANT_DATA.legendPosition,
    },
    plugins: {
      title: {
        display: true,
        font: {
          size: CONSTANT_DATA.titleSize,
        },
        text: CONSTANT_DATA.display.todayChartTitle,
      },
    },
  };

  return (
    <Doughnut data={chartData} options={options} width={500} height={500} />
  );
};
