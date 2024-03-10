"use client";
import React, { useState } from "react";

import DeliveryInfor from "./delivery-info";
import SelectPaymentMethod from "./select-payment-method";

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
}

export default BodyOrder;
