import React from "react";

import BreadCrumb from "@/components/platform/bread-crumb";
import BodyOrder from "@/components/platform/order/order";
import { getOrderId, getWalletByUserId } from "@/lib/actions";
function pagesOrder({ params }: { params: { orderId: string } }) {
  const orderPromisse = getOrderId(params.orderId);

  return (
    <>
      <BreadCrumb
        descriptionTitle="Live Auction"
        middlePath="Order"
        routeUrl="order"
      />

      <React.Suspense fallback={<div>...loading</div>}>
        <BodyOrder orderPromisse={orderPromisse} />
      </React.Suspense>
    </>
  );
}

export default pagesOrder;
