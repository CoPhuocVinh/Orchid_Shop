import React from "react";

import BreadCrumb from "@/components/platform/bread-crumb";
import BodyOrder from "@/components/platform/order/order";
function pagesOrder() {
  return (
    <>
      <BreadCrumb
        descriptionTitle="Live Auction"
        middlePath="Order"
        routeUrl="order"
      />
      <BodyOrder />
    </>
  );
}

export default pagesOrder;
