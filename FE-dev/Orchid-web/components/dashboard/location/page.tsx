
import dynamic from "next/dynamic";
import LocationSelector from "../forms/location-selector";

const Map = dynamic(() => import("../chart/map"), {
  ssr: false,
});

function LocationV2() {
  return (
    <div className="xl:w-66 w-full rounded-lg bg-white dark:bg-darkblack-600 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-bgray-900 dark:text-white sm:text-2xl text-xl font-bold">
          Most locations
        </h3>
        <LocationSelector />
      </div>
      <div className="xl:flex xl:space-x-[26px] items-center">
        <div className="xl:flex-1 w-full mb-4 xl:mb-0">
          <div className="flex space-x-2 items-end mb-1">
            <h1 className="text-2xl dark:text-white font-bold leading-[30px] text-bgray-900">
              76,345
            </h1>
            <div className="w-[60px] h-[22px] rounded-full bg-success-400 flex justify-center items-center">
              <div className="flex space-x-1 items-center">
                <span>
                  <svg
                    width="10"
                    height="7"
                    viewBox="0 0 10 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.5 5.89575L3.5 2.89575L5.5 4.89575L9.5 0.895752"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 0.895752H9.5V4.39575"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-white text-xs font-medium">12,00%</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-bgray-600 dark:text-darkblack-300 mb-7">
            Compared to last month
          </p>
          <div className="flex flex-col space-y-2.5">
            <div className="w-full h-[32px] px-2 bg-bgray-100 dark:bg-darkblack-500 rounded-lg flex justify-between items-center">
              <div className="flex space-x-2 items-center">
                <div className="w-2 h-2 rounded-full bg-success-300"></div>
                <span className="text-bgray-900 dark:text-white text-sm font-medium">
                  United States
                </span>
              </div>
              <span className="text-bgray-600 text-sm font-medium">15,732</span>
            </div>
            <div className="w-full h-[32px] px-2 rounded-lg flex justify-between items-center">
              <div className="flex space-x-2 items-center">
                <div className="w-2 h-2 rounded-full bg-warning-300"></div>
                <span className="text-bgray-900 dark:text-white text-sm font-medium">
                  California
                </span>
              </div>
              <span className="text-bgray-600 text-sm font-medium">15,732</span>
            </div>
            <div className="w-full h-[32px] px-2 bg-bgray-100 dark:bg-darkblack-500 rounded-lg flex justify-between items-center">
              <div className="flex space-x-2 items-center">
                <div className="w-2 h-2 rounded-full bg-purple"></div>
                <span className="text-bgray-900 dark:text-white text-sm font-medium">
                  Dhaka
                </span>
              </div>
              <span className="text-bgray-600 text-sm font-medium">15,732</span>
            </div>
            <div className="w-full h-[32px] px-2 rounded-lg flex justify-between items-center">
              <div className="flex space-x-2 items-center">
                <div className="w-2 h-2 rounded-full bg-error-300"></div>
                <span className="text-bgray-900 dark:text-white text-sm font-medium">
                  Los Angels
                </span>
              </div>
              <span className="text-bgray-600 text-sm font-medium">15,732</span>
            </div>
          </div>
        </div>
        <div className="xl:w-[412px] w-full flex justify-center">
          <div className="xl:w-full md:w-[350px] w-[300px]">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationV2;
