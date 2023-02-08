import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { CONSTANT_DATA } from "./constant";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export const AllChart = (props) => {
  const chartData = {
    labels: [
      CONSTANT_DATA.display.allLabel.today,
      CONSTANT_DATA.display.allLabel.threeDays,
      CONSTANT_DATA.display.allLabel.other,
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [
          props.data.highPriorityTodosCount,
          props.data.normalPriorityTodosCount,
          props.data.lowPriorityTodosCount,
        ],
        backgroundColor: [
          CONSTANT_DATA.color.red,
          CONSTANT_DATA.color.blue,
          CONSTANT_DATA.color.yellow,
        ],
        borderColor: [
          CONSTANT_DATA.borderColor.red,
          CONSTANT_DATA.borderColor.blue,
          CONSTANT_DATA.borderColor.yellow,
        ],
        borderWidth: CONSTANT_DATA.borderWidth,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: false,
    plugins: {
      legend: {
        position: CONSTANT_DATA.legendPosition,
      },
      title: {
        display: true,
        font: {
          size: CONSTANT_DATA.titleSize,
        },
        text: CONSTANT_DATA.display.allChartTitle,
      },
    },
  };

  return (
    <Doughnut data={chartData} options={options} width={500} height={500} />
  );
};
