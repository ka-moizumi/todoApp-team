import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { exportedChartData } from "./constant";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export const TodayChart = (props) => {
  const chartData = {
    labels: [
      exportedChartData.todaylabel.complete,
      exportedChartData.todaylabel.incomplete,
    ],
    datasets: [
      {
        label: "# of Votes",
        data: props.data,
        backgroundColor: [
          exportedChartData.color.blue,
          exportedChartData.color.red,
        ],
        borderColor: [
          exportedChartData.borderColor.blue,
          exportedChartData.borderColor.red,
        ],
        borderWidth: exportedChartData.borderWidth,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: false,
    legend: {
      position: exportedChartData.legendPosition,
    },
    plugins: {
      title: {
        display: true,
        font: {
          size: exportedChartData.title.size,
        },
        text: exportedChartData.title.text.todayTodo,
      },
    },
  };

  return (
    <Doughnut data={chartData} options={options} width={500} height={500} />
  );
};
