"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useGetAddress } from "@/lib/react-query/queries";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function BodyOrder() {
  const [selectedMethod, setSelectedMethod] = useState("card");
  const { data: session } = useSession();
  const { data: in4DetailResponseList } = useGetAddress(
    session?.user.id! || "1"
  );
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleAddressSelect = (address: any) => {
    setSelectedAddress(address);
  };
  const sortAddresses = (addresses: any) => {
    const sortedAddresses = addresses.sort((a: any, b: any) => {
      if (a.defaulted && !b.defaulted) {
        return -1;
      } else if (!a.defaulted && b.defaulted) {
        return 1;
      } else {
        return 0;
      }
    });

    return sortedAddresses;
  };
  const orderData = {
    id: 1,
    total: 200,
    phone: "",
    address: "",
    expiredAt: "2024-03-12T17:00:00",
    productName: "Hoa phong lan tím",
    productCode: "h2t46urqknwxvbqbatuo",
    quantity: 3,
    note: "Order note",
    auctionID: 2,
    userID: 1,
    created_at: "2024-03-11T17:00:00",
    updated_at: "2024-03-12T13:03:34",
  };

  const handleMethodChange = (method: any) => {
    setSelectedMethod(method);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Delivery Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Order Details</h3>
                <div className="flex items-center mb-4">
                  <Image
                    src="/images/hoa-lan/hoa-lan-dep_1.jpg"
                    alt={orderData.productName}
                    width={200}
                    height={200}
                    className="rounded-md"
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold">
                      {orderData.productName}
                    </h4>
                    <p className="text-gray-500">
                      Code: {orderData.productCode}
                    </p>
                    <p className="text-gray-500">
                      Quantity: {orderData.quantity}
                    </p>
                    <p className="text-gray-500">Note: {orderData.note}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Select Address</h3>
                {in4DetailResponseList?.data &&
                  sortAddresses(in4DetailResponseList.data).map(
                    (address: any) => (
                      <div key={address.id} className="py-2">
                        <Alert className="flex flex-col">
                          <div className="flex justify-between items-center">
                            <AlertTitle className="">
                              {address.info_name}
                            </AlertTitle>
                            <span>-</span>
                            <AlertTitle className="mr-auto">
                              {address.phone}
                            </AlertTitle>
                          </div>
                          <div className="flex items-center">
                            <AlertDescription className="order-1 mr-auto">
                              {address.address}
                            </AlertDescription>
                          </div>
                          <div>
                            <AlertDescription className="mb-auto">
                              {address.defaulted && (
                                <label className=" bg-white relative inline-flex items-center justify-center gap-2 text-sm font-medium h-9 rounded-md px-3 border border-red-500 text-red-600">
                                  Mặc định
                                </label>
                              )}
                            </AlertDescription>
                          </div>
                        </Alert>
                      </div>
                    )
                  )}
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">
              Select Payment Method
            </h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <Button
                  variant={selectedMethod === "card" ? "primary" : "outline"}
                  onClick={() => handleMethodChange("card")}
                  className="w-full flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 mr-2"
                  >
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                  Card
                </Button>
              </div>
              {/* Add more payment methods here */}
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Order Summary</h4>

              <div className="border-t border-gray-300 my-4" />
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="text-gray-500 font-semibold">Total</div>
                <div className="text-right font-semibold">
                  ${orderData.total}
                </div>
              </div>
              <Button className="bg-slate-400 hover:bg-green-800 w-full">
                Proceed to payment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BodyOrder;
