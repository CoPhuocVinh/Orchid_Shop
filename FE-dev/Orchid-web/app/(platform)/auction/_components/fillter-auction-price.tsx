// Import các thư viện cần thiết
import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import Price_Slider from "./Price_Slider";

// Component FilterAuctionPrice
function Filter_Auction_Price() {
  const [value, setValue] = useState([0, 1000000]); // Giá trị mặc định từ 0 đến 1 triệu VND

  // Hàm xử lý sự kiện khi thanh trượt thay đổi
  const handleSliderChange = (newValue: any) => {
    setValue(newValue);
  };

  // Hàm định dạng giá tiền
  const formatPrice = (price: any) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <>
      <div className="mt-2">
        <div className="flex flex-col items-center">
          {/* <div className="mb-5">
            <h5>Giá</h5>
            <Slider
              min={0}
              max={100000}
              // value={value}
              onChange={handleSliderChange}
              className="w-full mx-0 my-0"
              //trackStyle={trackStyle}
              // handleStyle={[handleStyle, handleStyle]} // Áp dụng style cho cả hai đầu mút
            />
            <div className="flex items-center justify-center mt-3">
              <div className="mr-3">Giá:</div>
              <div className="fw-bold">
                {formatPrice(value[0])}VND-{formatPrice(value[1])}VND
              </div>
            </div>
          </div> */}

          <Price_Slider />
        </div>
      </div>
    </>
  );
}

export default Filter_Auction_Price;
