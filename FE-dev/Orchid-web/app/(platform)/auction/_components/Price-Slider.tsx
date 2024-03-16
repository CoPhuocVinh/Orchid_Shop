import React, { useState } from "react";

import Slider from "react-slider";

const PriceSlider = ({
  onChangePrice,
}: {
  onChangePrice: (price: { valueMin: number; valueMax: number }) => void;
}) => {
  const [values, setValues] = useState([0, 100000]);

  const handleChange = (newValues: number[]) => {
    setValues(newValues);

    onChangePrice({
      valueMin: newValues[0],
      valueMax: newValues[1],
    });
  };

  return (
    <div className=" border-gray-300 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold mb-2">Price Range</h2>

      <Slider
        className="slider h-2 w-full bg-gray-300 rounded-full mt-4 mb-4"
        value={values}
        onChange={handleChange}
        min={0}
        max={100000}
        renderThumb={(props, state) => (
          <div
            {...props}
            className={`slider-thumb h-5 w-5 rounded-full bg-blue-500 cursor-grab shadow-md mb-4 ${
              state.valueNow === values[0] || state.valueNow === values[1]
                ? "shadow-lg"
                : ""
            }`}
          />
        )}
      />
      <div className="flex justify-between">
        <div className="flex flex-col w-1/4">
          <label htmlFor="minPrice" className="text-gray-700 mb-1">
            Min Price: {values[0]}
          </label>
        </div>
        <div className="flex flex-col w-1/4">
          <label htmlFor="maxPrice" className="text-gray-700 mb-1">
            Max Price:{values[1]}
          </label>
        </div>
      </div>
    </div>
  );
};

export default PriceSlider;
