"use client";

import totalEarn from "/public/static/images/icons/total-earn.svg";
import memberImg from "/public/static/images/avatar/members-2.png";
import TotalWidgetCard from "./total-widget-card";
import React, { useEffect, useState } from "react";
import axios from "axios";

const TotalWidget = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://orchid.fams.io.vn/api/v1/orders/count"
        );
        // console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Có lỗi xảy ra:", error);
      }
    };

    fetchData();
  }, []);
  console.log(data);
  return (
    <div className="mb-[24px] w-full">
      <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-3">
        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Total Order"
          amount={data}
          // amount="12343"
          id="totalEarn"
        />
      </div>
    </div>
  );
};

export default TotalWidget;
