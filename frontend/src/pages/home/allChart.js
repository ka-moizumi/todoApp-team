import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { exportedChartData } from "./constant";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export const AllChart = (props) => {
  const chartData = {
    labels: [
      exportedChartData.allLabel.today,
      exportedChartData.allLabel.threeDays,
      exportedChartData.allLabel.other,
    ],
    datasets: [
      {
        label: "# of Votes",
        data: props.data,
        backgroundColor: [
          exportedChartData.color.red,
          exportedChartData.color.blue,
          exportedChartData.color.yellow,
        ],
        borderColor: [
          exportedChartData.borderColor.red,
          exportedChartData.borderColor.blue,
          exportedChartData.borderColor.yellow,
        ],
        borderWidth: exportedChartData.borderWidth,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: false,
    plugins: {
      legend: {
        position: exportedChartData.legendPosition,
      },
      title: {
        display: true,
        font: {
          size: exportedChartData.title.size,
        },
        text: exportedChartData.title.text.allTodos,
      },
    },
  };

  return (
    <Doughnut data={chartData} options={options} width={500} height={500} />
  );
};
