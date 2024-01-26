"use client";

import { useRef } from "react";
import { useEffect } from "react";
import DateFilter from "../forms/date-filter";
import LineChart from "../chart/line-chart";
import { useTheme } from "next-themes";

const createGradient = (ctx: any) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 450);
  gradient.addColorStop(0, "rgba(34, 197, 94,0.41)");
  gradient.addColorStop(0.6, "rgba(255, 255, 255, 0)");
  return gradient;
};

function SummaryV3() {
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
  }, [theme]);

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
        // pointRadius: 5,
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
        drawBorder: false,
        ticks: {
          color: theme === "" ? "black" : "white",
        },
        grid: {
          display: true,
          drawBorder: false,
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
          drawTicks: false,
          color: theme === "" ? "rgba(243 ,246, 255 ,1)" : "rgba(34,38,46,1)",
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
    <div className="w-full bg-white dark:bg-darkblack-600 flex flex-col justify-between rounded-lg lg:px-8 lg:py-7 p-4 mb-[48px]">
      <div className="flex justify-between items-center pb-2 mb-2">
        <div>
          <span className="text-sm font-medium text-bgray-600 dark:text-white">
            Overall Balance
          </span>
          <div className="flex items-center space-x-2">
            <h3 className="sm:text-2xl text-xl text-bgray-900 dark:text-white font-bold leading-[36px]">
              $48,574.21
            </h3>
            <span className="text-sm font-medium text-success-300">+20%</span>
          </div>
        </div>
        <div className="sm:flex hidden space-x-[28px] items-center">
          <div className="flex space-x-2 items-center">
            <div className="w-3 h-3 bg-success-300 rounded-full"></div>
            <span className="text-bgray-700 dark:text-white text-sm font-medium">
              Signed
            </span>
          </div>
          <div className="flex space-x-2 items-center">
            <div className="w-3 h-3 bg-orange rounded-full"></div>
            <span className="text-bgray-700 dark:text-white text-sm font-medium">
              Lost
            </span>
          </div>
        </div>
        <DateFilter
          options={["Jan 10 - Jan 16", "Jan 11 - Jan 16", "Jan 12 - Jan 16"]}
        />
      </div>
      <div className="w-full h-[280px]">
        <LineChart
          dataSet={data}
          option={options}
          plugins={plugins}
          refer={chartRef}
        />
      </div>
    </div>
  );
}

export default SummaryV3;
