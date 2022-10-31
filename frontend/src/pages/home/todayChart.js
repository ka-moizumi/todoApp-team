import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export const TodayChart = (props) => {
  const chartData = {
    labels: ["完了", "未完了"],
    datasets: [
      {
        label: "# of Votes",
        data: props.data,
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: false,
    legend: {
      position: "top",
    },
    plugins: {
      title: {
        display: true,
        font: {
          size: 24,
        },
        text: "今日のTodo",
      },
    },
  };

  return (
    <Doughnut data={chartData} options={options} width={500} height={500} />
  );
};
