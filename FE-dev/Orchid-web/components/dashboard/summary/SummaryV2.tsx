"use client";
import { useContext } from "react";

import { useRef } from "react";
import { useEffect } from "react";
// import { ThemeContext } from "@/app/(dashboard)/layout";
import DateFilter from "../forms/date-filter";
import LineChart from "../chart/line-chart";
import { useTheme } from "next-themes";

const createGradient = (ctx: any) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 450);
  gradient.addColorStop(0, "rgba(34, 197, 94,0.41)");
  gradient.addColorStop(0.6, "rgba(255, 255, 255, 0)");
  return gradient;
};

function SummaryV2() {
  // const { theme } = useContext(ThemeContext);

  const {setTheme, theme} = useTheme()

  // const theme = ''
  const chartRef = useRef<any | null>(null);

  useEffect(() => {
    // // Get canvas context and create gradient
    const ctx = chartRef?.current?.getContext("2d")?.chart.ctx;

    if (ctx) {
      const gradient = createGradient(ctx);
      // Update chart data and options
      chartRef.current.data.datasets[0].backgroundColor = gradient;
      chartRef.current.update();
    }
  }, []);
  let month = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const plugins = [
    {
      beforeDatasetsDraw(chart: any) {
        chart.ctx.shadowColor = "rgba(37, 99, 235, 0.14)";
        chart.ctx.shadowBlur = 8;
      },
      afterDatasetsDraw(chart: any) {
        chart.ctx.shadowColor = "rgba(0, 0, 0, 0)";
        chart.ctx.shadowBlur = 0;
      },
    },
  ];
  const data = {
    labels: month,
    datasets: [
      {
        label: "Signed",
        data: [65, 75, 65, 55, 75, 55, 45, 65, 75, 65, 85, 75],
        borderColor: "#22C55E",
        pointBorderColor: "#ffffff",
        pointBackgroundColor: "#22C55E",
        pointBorderWidth: 4,
        borderWidth: 2,
        fill: true,
        fillColor: "#fff",
        tension: 0.4,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: theme === "" ? "black" : "white",
        },
        grid: {
          color: theme === "" ? "rgba(243 ,246, 255 ,1)" : "rgba(34,38,46,1)",
        },
        gridLines: {
          zeroLineColor: "transparent",
        },
      },
      y: {
        beginAtZero: true,
        border: { dash: [5, 5] },
        grid: {
          color: theme === "" ? "rgba(243 ,246, 255 ,1)" : "rgba(34,38,46,1)",
          borderDashOffset: 2,
        },
        gridLines: {
          zeroLineColor: "transparent",
        },
        ticks: {
          color: theme === "" ? "black" : "white",
          callback(value: any) {
            return `${value}K `;
          },
        },
      },
    },

    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: false,
        text: "Visitor: 2k",
      },
      // tooltip: {
      //   enabled: false,
      // },
    },
    elements: {
      point: {
        radius: [0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0],
        hoverRadius: 6,
      },
    },
  };

  return (
    <div className="xl:w-66 w-full bg-white dark:bg-darkblack-600 flex flex-col justify-between rounded-lg px-6 py-3">
      <div className="flex justify-between items-center pb-2 mb-2 border-b border-bgray-300">
        <h3 className="text-bgray-900 dark:text-white sm:text-2xl text-xl font-bold">
          Summary
        </h3>
        <div className="sm:flex hidden space-x-[28px] items-center">
          <div className="flex space-x-2 items-center">
            <div className="w-3 h-3 bg-success-300 rounded-full"></div>
            <span className="text-bgray-700 dark:text-bgray-50 text-sm font-medium">
              Signed
            </span>
          </div>
          <div className="flex space-x-2 items-center">
            <div className="w-3 h-3 bg-orange rounded-full"></div>
            <span className="text-bgray-700 dark:text-bgray-50 text-sm font-medium">
              Lost
            </span>
          </div>
        </div>
        <DateFilter
          options={["Jan 11 - Jan 16", "Jan 12 - Jan 16", "Jan 13 - Jan 16"]}
        />
      </div>
      <div className="w-full h-[255px]">
        {/* <canvas id="revenueFlowLine" height="255"></canvas> */}
        <LineChart
          plugins={plugins}
          dataSet={data}
          option={options}
          refer={chartRef}
        />
      </div>
    </div>
  );
}

export default SummaryV2;
