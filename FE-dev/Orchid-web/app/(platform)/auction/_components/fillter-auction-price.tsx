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
          <Price_Slider />
        </div>
      </div>
    </>
  );
}

export default Filter_Auction_Price;
