"use client";
import { useContext } from "react";

// import { ThemeContext } from "@/app/(dashboard)/layout";
import DateFilter from "../forms/date-filter";
import BarChart from "../chart/bar-chart";

function Summary() {
  // let { theme } = useContext(ThemeContext);
  const theme = ''
  let revenueFlowBarmonth = [
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
  let revenueDark = [
    {
      label: "Dataset 1",
      data: [65, 75, 65, 55, 75, 55, 45, 65, 75, 65, 85, 75],
      backgroundColor: [
        "rgba(42, 49, 60, 1)",
        "rgba(42, 49, 60, 1)",
        "rgba(42, 49, 60, 1)",
        "rgba(42, 49, 60, 1)",
        "rgba(42, 49, 60, 1)",
        "rgba(255, 120, 75, 1)",
        "rgba(42, 49, 60, 1)",
        "rgba(42, 49, 60, 1)",
        "rgba(42, 49, 60, 1)",
        "rgba(42, 49, 60, 1)",
        "rgba(42, 49, 60, 1)",
        "rgba(42, 49, 60, 1)",
      ],
      borderRadius: 3,
    },
    {
      label: "Dataset 2",
      data: [70, 80, 70, 65, 65, 65, 60, 70, 80, 70, 80, 65],
      backgroundColor: [
        "rgba(42, 49, 60, 1)",
        "rgba(42, 49, 60, 1)",
        "rgba(42, 49, 60, 1)",
        "rgba(42, 49, 60, 1)",
        "rgba(42, 49, 60, 1)",
        "rgba(74, 222, 128, 1)",
        "rgba(42, 49, 60, 1)",
        "rgba(42, 49, 60, 1)",
        "rgba(42, 49, 60, 1)",
        "rgba(42, 49, 60, 1)",
        "rgba(42, 49, 60, 1)",
        "rgba(42, 49, 60, 1)",
      ],
      borderRadius: 3,
    },
  ];
  let revenueLight = [
    {
      label: "Dataset 1",
      data: [65, 75, 65, 55, 75, 55, 45, 65, 75, 65, 85, 75],
      backgroundColor: [
        "rgba(237, 242, 247, 1)",
        "rgba(237, 242, 247, 1)",
        "rgba(237, 242, 247, 1)",
        "rgba(237, 242, 247, 1)",
        "rgba(237, 242, 247, 1)",
        "rgba(255, 120, 75, 1)",
        "rgba(237, 242, 247, 1)",
        "rgba(237, 242, 247, 1)",
        "rgba(237, 242, 247, 1)",
        "rgba(237, 242, 247, 1)",
        "rgba(237, 242, 247, 1)",
        "rgba(237, 242, 247, 1)",
      ],
      borderRadius: 3,
    },
    {
      label: "Dataset 2",
      data: [70, 80, 70, 65, 65, 65, 60, 70, 80, 70, 80, 65],
      backgroundColor: [
        "rgba(237, 242, 247, 1)",
        "rgba(237, 242, 247, 1)",
        "rgba(237, 242, 247, 1)",
        "rgba(237, 242, 247, 1)",
        "rgba(237, 242, 247, 1)",
        "rgba(74, 222, 128, 1)",
        "rgba(237, 242, 247, 1)",
        "rgba(237, 242, 247, 1)",
        "rgba(237, 242, 247, 1)",
        "rgba(237, 242, 247, 1)",
        "rgba(237, 242, 247, 1)",
        "rgba(237, 242, 247, 1)",
      ],
      borderRadius: 3,
    },
  ];

  const data = {
    labels: revenueFlowBarmonth,
    datasets: theme === "" ? revenueLight : revenueDark,
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        border: { dash: [5, 5] },
        grid: {
          color:
            theme === "" ? "rgba(244, 244, 244, 1)" : "rgba(42, 49, 60, 0.3)",

          borderDashOffset: 2,
        },
        gridLines: {
          zeroLineColor: "transparent",
        },
        ticks: {
          color: theme === "" ? "black" : "white",
          callback(value: any) {
            return `${value}% `;
          },
        },
      },
      x: {
        border: { dash: [5, 5] },
        grid: {
          color:
            theme === "" ? "rgba(244, 244, 244, 1)" : "rgba(42, 49, 60, 0.3)",
          borderDash: [5, 5],
          borderDashOffset: 2,
        },
        ticks: {
          color: theme === "" ? "black" : "white",
        },
        gridLines: {
          zeroLineColor: "transparent",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <div className="xl:w-66 w-full bg-white dark:bg-darkblack-600 flex flex-col justify-between rounded-lg px-[24px] py-3">
      <div className="flex justify-between items-center pb-2 mb-2 border-b border-bgray-300 dark:border-darkblack-400">
        <h3 className="text-bgray-900 dark:text-white sm:text-2xl text-xl font-bold">
          Summary
        </h3>
        <div className="sm:flex hidden space-x-[28px] items-center">
          <div className="flex space-x-2 items-center">
            <div className="w-3 h-3 bg-orange rounded-full"></div>
            <span className="text-bgray-700 dark:text-white text-sm font-medium">
              Lost
            </span>
          </div>
          <div className="flex space-x-2 items-center">
            <div className="w-3 h-3 bg-success-300 rounded-full"></div>
            <span className="text-bgray-700 dark:text-white text-sm font-medium">
              Signed
            </span>
          </div>
        </div>
        <DateFilter
          options={["Jan 11 - Jan 16", "Jan 12 - Jan 16", "Jan 13 - Jan 16"]}
        />
      </div>
      <div className="w-full h-[255px]">
        <BarChart data={data} options={options} />
      </div>
    </div>
  );
}

export default Summary;
