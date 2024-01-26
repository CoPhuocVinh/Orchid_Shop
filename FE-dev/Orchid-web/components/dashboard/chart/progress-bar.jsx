import ProtoTypes from "prop-types";

function Progressbar({ className }) {
  return (
    <div
      className={
        className
          ? className
          : "bg-bgray-200 dark:bg-darkblack-600 p-7 rounded-xl"
      }
    >
      <div className="flex-row space-x-6 2xl:flex-row 2xl:space-x-6 flex md:flex-col md:space-x-0 items-center">
        <div className="progess-bar flex justify-center md:mb-[13px] xl:mb-0 mb-0">
          <div className="bonus-per relative">
            <div className="bonus-outer">
              <div className="bonus-inner">
                <div className="number">
                  <span className="text-sm font-medium text-bgray-900">
                    64%
                  </span>
                </div>
              </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="80px" height="80px">
              <circle
                style={{
                  strokeDashoffset: "calc(215 - 215 * (64 / 100))",
                }}
                cx="40"
                cy="40"
                r="35"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col md:items-center xl:items-start items-start">
          <h4 className="text-bgray-900 dark:text-white text-base font-bold">
            Complete profile
          </h4>
          <span className="text-sm font-medium text-bgray-700 dark:text-darkblack-300">
            Complete your profile to unlock all features
          </span>
        </div>
      </div>
      <button
        aria-label="none"
        className="w-full mt-4 bg-success-300 hover:bg-success-400 text-white font-bold text-xs py-3 rounded-lg"
      >
        Verify identify
      </button>
    </div>
  );
}

Progressbar.propTypes = {
  className: ProtoTypes.string,
};

export default Progressbar;
