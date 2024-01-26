"use client";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ProtoTypes from "prop-types";

ChartJS.register(ArcElement, Tooltip, Legend, Filler);

function PieChart({ data, customDataLabels, options }) {
  const dataSet = data || {
    labels: [10, 20, 30],
    datasets: [
      {
        label: "My First Dataset",
        data: [15, 20, 35, 40],
        backgroundColor: ["#1A202C", "#61C660", "#F8CC4B", "#EDF2F7"],
        borderColor: ["#ffffff", "#ffffff", "#ffffff", "#1A202C"],
        hoverOffset: 18,
        borderWidth: 0,
      },
    ],
  };

  const customDatalabels = customDataLabels || {
    id: "customDatalabels",
    afterDatasetsDraw(chart, args, pluginOptions) {
      const {
        ctx,
        data,
        chartArea: { top, bottom, left, right, width, height },
      } = chart;
      ctx.save();
      data.datasets[0].data.forEach((datapoint, index) => {
        const { x, y } = chart.getDatasetMeta(0).data[index].tooltipPosition();
        ctx.font = "bold 12px sans-serif";
        ctx.fillStyle = data.datasets[0].borderColor[index];
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`${datapoint}%`, x, y);
      });
    },
  };

  const option = options || {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Doughnut data={dataSet} options={option} plugins={[customDatalabels]} />
  );
}

PieChart.propTypes = {
  data: ProtoTypes.object,
  customDataLabels: ProtoTypes.object,
  options: ProtoTypes.object,
};

export default PieChart;
