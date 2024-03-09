"use client";
import React, { useState } from "react";

import DeliveryInfor from "./DeliveryInfor";
import SelectPaymentMethod from "./SelectPaymentMethod";

function BodyOrder() {
  return (
    <div className="container mx-auto p-4 grid grid-cols-4 gap-3">
      <div className="col-span-2 sm:col-span-3">
        <DeliveryInfor />
      </div>
      <div className="col-span-2 sm:col-span-1">
        <SelectPaymentMethod />
      </div>
    </div>
  );

  /*function togglePaymentMethod(method) {
    if (paymentMethod.includes(method)) {
      setPaymentMethod(paymentMethod.filter((m) => m !== method));
    } else {
      setPaymentMethod([...paymentMethod, method]);
    }
  }

  function applyVoucher(code) {
    // Logic to apply voucher
  }*/
}

export default BodyOrder;
