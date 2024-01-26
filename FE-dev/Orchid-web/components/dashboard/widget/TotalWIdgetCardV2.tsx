"use client";
import ProtoTypes from "prop-types";
import { useContext } from "react";
import Image from "next/image";
// import { ThemeContext } from "@/app/(dashboard)/layout";
import BarChart from "../chart/bar-chart";

function TotalWIdgetCardV2({ logo, activeMember }: any) {
  // let { theme } = useContext(ThemeContext);
  const theme = ''
  const data = {
    labels: ["Jan", "Feb", "Mar", "Afril", "May", "Jan"],
    datasets: [
      {
        label: "Visitor",
        data: [10, 20, 15, 50, 40, 25],
        backgroundColor:
          theme === ""
            ? [
                "rgba(237, 242, 247, 1)",
                "rgba(237, 242, 247, 1)",
                "rgba(237, 242, 247, 1)",
                "rgba(34, 197, 94, 1)",
                "rgba(237, 242, 247, 1)",
                "rgba(237, 242, 247, 1)",
              ]
            : [
                "rgba(42, 49, 60, 1)",
                "rgba(42, 49, 60, 1)",
                "rgba(42, 49, 60, 1)",
                "rgba(34, 197, 94, 1)",
                "rgba(42, 49, 60, 1)",
                "rgba(42, 49, 60, 1)",
              ],
        borderColor: "#22C55E",
        pointRadius: 0,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#22C55E",
        fill: true,
        fillColor: "#fff",
        tension: 0.4,
        borderWidth: 0,
        borderRadius: 3,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
        gridLines: {
          zeroLineColor: "red",
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
      tooltip: {
        enabled: false,
      },
    },
  };
  return (
    <div className="p-5 rounded-lg bg-white dark:bg-darkblack-600">
      <div className="flex justify-between items-center mb-5">
        <div className="flex space-x-[7px] items-center">
          <div className="icon">
            <span>
              <Image
                priority={true}
                height={logo.height}
                width={logo.width}
                src={logo.src}
                alt="icon"
              />
            </span>
          </div>
          <span className="text-lg text-bgray-900 font-semibold dark:text-white">
            Total earnings
          </span>
        </div>
        <div>
          <Image
            priority={true}
            height={activeMember.height}
            width={activeMember.width}
            src={activeMember.src}
            alt="members"
          />
        </div>
      </div>
      <div className="flex justify-between items-end">
        <div className="flex-1">
          <p className="text-bgray-900 font-bold text-3xl leading-[48px] dark:text-white">
            $7,245.00
          </p>
          <div className="flex items-center space-x-1">
            <span>
              <svg
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.4318 0.522827L12.4446 0.522827L8.55575 0.522827L7.56859 0.522827C6.28227 0.522827 5.48082 1.91818 6.12896 3.02928L9.06056 8.05489C9.7037 9.1574 11.2967 9.1574 11.9398 8.05489L14.8714 3.02928C15.5196 1.91818 14.7181 0.522828 13.4318 0.522827Z"
                  fill="#22C55E"
                />
                <path
                  opacity="0.4"
                  d="M2.16878 13.0485L3.15594 13.0485L7.04483 13.0485L8.03199 13.0485C9.31831 13.0485 10.1198 11.6531 9.47163 10.542L6.54002 5.5164C5.89689 4.41389 4.30389 4.41389 3.66076 5.5164L0.729153 10.542C0.0810147 11.6531 0.882466 13.0485 2.16878 13.0485Z"
                  fill="#22C55E"
                />
              </svg>
            </span>
            <span className="text-success-300 text-sm font-medium">+ 3.5%</span>
          </div>
        </div>
        <div className="w-[136px] h-[68px]">
          <BarChart data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

TotalWIdgetCardV2.propTypes = {
  logo: ProtoTypes.object,
  activeMember: ProtoTypes.object,
};

export default TotalWIdgetCardV2;
