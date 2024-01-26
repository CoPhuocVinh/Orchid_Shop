import React from 'react'
import SelectFilter from './select-filter';

const FilterFull = () => {
    return (
        <div className="filter-content w-full">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            <SelectFilter
              title="Location"
              placeHolder="State or province"
              options={["January", "February", "March"]}
            />
            <SelectFilter
              title="Amount Spent"
              placeHolder="State or province"
              options={["January", "February", "March"]}
            />
            <SelectFilter
              title="Transaction list Date"
              placeHolder="State or province"
              options={["January", "February", "March"]}
              icon={
                <svg
                  className="stroke-bgray-500 dark:stroke-white"
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.6758 5.8186H6.67578C5.57121 5.8186 4.67578 6.71403 4.67578 7.8186V19.8186C4.67578 20.9232 5.57121 21.8186 6.67578 21.8186H18.6758C19.7804 21.8186 20.6758 20.9232 20.6758 19.8186V7.8186C20.6758 6.71403 19.7804 5.8186 18.6758 5.8186Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.6758 3.8186V7.8186"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.67578 3.8186V7.8186"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.67578 11.8186H20.6758"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.6758 15.8186H12.6758"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.6758 15.8186V18.8186"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
            <SelectFilter
              title="Type of transaction"
              placeHolder="State or province"
              options={["January", "February", "March"]}
            />
          </div>
        </div>
      );
}

export default FilterFull