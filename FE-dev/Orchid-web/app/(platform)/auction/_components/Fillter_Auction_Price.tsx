// Import các thư viện cần thiết
import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";

// Component FilterAuctionPrice
function Filter_Auction_Price() {
  const [priceRange, setPriceRange] = useState([0, 100]);

  const handlePriceChange = (values) => {
    setPriceRange(values);
  };

  const [value, setValue] = useState([0, 1000000]); // Giá trị mặc định từ 0 đến 1 triệu VND

  // Hàm xử lý sự kiện khi thanh trượt thay đổi
  const handleSliderChange = (newValue: any) => {
    setValue(newValue);
  };

  // Hàm định dạng giá tiền
  const formatPrice = (price: any) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Các style cho các phần tử trong giao diện
  const sliderStyle = {
    width: "100%",
    margin: "0 auto",
    // Thêm các style cần thiết
  };

  const valueContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10px",
    // Thêm các style cần thiết
  };

  const valueLabelStyle = {
    marginRight: "10px",
    // Thêm các style cần thiết
  };

  const handleStyle = {
    borderColor: "#FFF",
    backgroundColor: "#FFF",
  };

  const trackStyle = {
    backgroundColor: "red",
  };

  return (
    <>
      <div className="mt-2">
        <div className="flex flex-col items-center">
          <div>
            <h5>Giá</h5>
            <Slider
              range
              min={0}
              max={1000000}
              value={value}
              onChange={handleSliderChange}
              style={sliderStyle}
              trackStyle={trackStyle}
              handleStyle={[handleStyle, handleStyle]} // Áp dụng style cho cả hai đầu mút
            />
            <div style={valueContainerStyle}>
              <div style={valueLabelStyle}>Giá:</div>
              <div className="fw-bold">
                {formatPrice(value[0])}VND-{formatPrice(value[1])}VND
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter_Auction_Price;
