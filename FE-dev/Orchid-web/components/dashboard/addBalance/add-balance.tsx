import React from 'react'
import GreenBtn from '../button/add-mony';
import TransparentBtn from '../button/transparent-btn';

const AddBalance = () => {
    return (
        <div className="w-full rounded-xl bg-white dark:bg-darkblack-600 px-7 py-11 mb-[48px]">
          <div className="border border-bgray-300 dark:border-darkblack-400 rounded-lg p-8 pb-12">
            <h3 className="text-2xl font-semibold text-bgray-900 dark:text-white">
              Total Balance
            </h3>
            <h2 className="text-4xl font-bold font-poppins text-bgray-900 dark:text-white mb-2">
              $88,232.00{" "}
              <span className="text-base font-medium uppercase text-bgray-500">
                USD
              </span>
            </h2>
            <div className="flex gap-4">
              <span className="text-base font-medium text-bgray-500 dark:text-darkblack-300">
                11 April 2022
              </span>
              <span className="flex">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5 5.83325L10.8333 12.4999L7.5 9.16659L2.5 14.1666M10.8333 5.83325H17.5H10.8333ZM17.5 5.83325V12.4999V5.83325Z"
                    stroke="#00C566"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-base font-semibold text-success-300">
                  2,05%
                </span>
              </span>
            </div>
          </div>
          <div className="flex justify-center -mt-6">
            <TransparentBtn title="Withdraw All Earning" />
          </div>
          <GreenBtn text="Add Money" />
        </div>
      );
}

export default AddBalance