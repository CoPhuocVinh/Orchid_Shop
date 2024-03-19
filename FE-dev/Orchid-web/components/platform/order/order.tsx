"use client";
import React, { useState } from "react";
import axios from "axios"; // Thêm dòng này để import axios

import { Button } from "@/components/ui/button";

import { useGetAddress } from "@/lib/react-query/queries";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getOrderId } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface BodyOrderProps {
  orderPromisse: ReturnType<typeof getOrderId>;
}
function BodyOrder({ orderPromisse }: BodyOrderProps) {
  const { data: orderData } = React.use(orderPromisse);
  const router = useRouter();

  const [selectedMethod, setSelectedMethod] = useState("");
  const { data: session } = useSession();
  const { data: in4DetailResponseList, refetch: refetchAddresses } =
    useGetAddress(session?.user.id! || "1");

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showModal, setShowModal] = useState(false); // Thêm state để quản lý hiển thị modal
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false); // Thêm state để quản lý trạng thái thanh toán
  const [isWaiting, setIsWaiting] = useState(false); // Thêm state để quản lý trạng thái "waiting"
  const [orderConfirmed, setOrderConfirmed] = useState(false); // Thêm state để quản lý hiển thị modal khi đơn hàng đã được xác nhận

  const handleAddressSelect = (address: any) => {
    setSelectedAddress(address.id);
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
  const handleMethodChange = (method: any) => {
    console.log(method);
    setSelectedMethod(method);
  };

  const handleUpdateOrder = async () => {
    try {
      const orderId = orderData?.id;
      const payload = {
        paymentMethod: selectedMethod,
        note: "string",
        userIn4Id: selectedAddress,
      };
      setIsWaiting(selectedMethod === "BANK"); // Đặt trạng thái "waiting" nếu chọn BANK

      const response = await axios.put(
        `https://orchid.fams.io.vn/api/v1/orders/update-order/${orderId}`,
        payload
      );

      console.log(response);
      console.log(response.data.status);
      console.log(response.data.payload);

      const userId = session?.user.id;

      if (selectedMethod === "CARD" && response.data.status === "SUCCESS") {
        setIsPaymentSuccessful(true);
        router.push("/");
      } else {
        setIsPaymentSuccessful(false);
      }

      if (selectedMethod === "BANK" && response.data.status === "SUCCESS") {
        // Mở trang thanh toán VNPay
        router.push(response.data.payload);

        // Lắng nghe sự kiện thanh toán thành công hoặc thất bại từ trang thanh toán VNPay
        window.addEventListener("message", (event) => {
          console.log(event.data);

          if (event.data === "SUCCESS") {
            // Thanh toán thành công, redirect đến trang "test-success"
            router.push("/test-success");
          } else if (event.data === "failed") {
            // Thanh toán thất bại, redirect đến trang "test-failed"
            router.push("/test-failed");
          }
        });
      } else {
        setIsPaymentSuccessful(false);
        setShowModal(true); // Mở modal
      }

      // Kiểm tra nếu đơn hàng đã được xác nhận
      if (
        (selectedMethod === "CARD" && response.data.status === "CONFIRMED") ||
        (selectedMethod === "BANK" && response.data.status === "CONFIRMED")
      ) {
        setOrderConfirmed(true);
      }

      setShowModal(true); // Mở modal
    } catch (error) {
      console.error(error);
      setIsPaymentSuccessful(false); // Đặt trạng thái thất bại
      setShowModal(true); // Mở modal
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
                    alt={orderData?.productName!}
                    width={200}
                    height={200}
                    className="rounded-md"
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold">
                      {orderData?.productName}
                    </h4>
                    <p className="text-gray-500">
                      Code: {orderData?.productCode}
                    </p>
                    <p className="text-gray-500">
                      Quantity: {orderData?.quantity}
                    </p>
                    <p className="text-gray-500">Note: {orderData?.note}</p>
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
                            <AlertTitle>{address.info_name}</AlertTitle>
                            <AlertTitle className="mr-auto">
                              {address.phone}
                            </AlertTitle>
                          </div>
                          <div className="flex items-center">
                            <AlertDescription className="order-1 mr-auto">
                              {address.address}
                            </AlertDescription>
                          </div>
                          <div className="flex items-center ">
                            <AlertDescription className="order-1 mr-auto">
                              <input
                                type="radio"
                                id={`address-${address.id}`} // Sử dụng id duy nhất dựa trên id của địa chỉ
                                name="address"
                                //checked={selectedAddress === address.id} // Đảm bảo input được kiểm tra nếu địa chỉ đó đã được chọn
                                defaultChecked={selectedAddress == address}
                                onChange={() => handleAddressSelect(address)}
                              />
                              <label
                                htmlFor={`address-${address.id}`}
                                className="ml-2"
                              >
                                {address.id === selectedAddress
                                  ? "Mặc định"
                                  : "Chọn"}
                              </label>
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
                  variant={selectedMethod === "CARD" ? "primary" : "outline"}
                  onClick={() => handleMethodChange("CARD")}
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
                  Wallet
                </Button>
              </div>
              <div>
                <Button
                  variant={selectedMethod === "BANK" ? "primary" : "outline"}
                  onClick={() => handleMethodChange("BANK")}
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
                  VNPay
                </Button>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Order Summary</h4>

              <div className="border-t border-gray-300 my-4" />
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="text-gray-500 font-semibold">Total</div>
                <div className="text-right font-semibold">
                  ${orderData?.total}
                </div>
              </div>
              <Button
                className="bg-slate-400 hover:bg-green-800 w-full"
                onClick={handleUpdateOrder}
              >
                Proceed to payment
              </Button>
              {/* Modal */}
              {/* Modal */}
              {showModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white rounded p-4 max-w-md w-full">
                    {/* Modal content */}
                    {isWaiting ? (
                      <div className="flex items-center justify-center mb-4">
                        <p className="font-bold text-lg">Please wait...</p>
                      </div>
                    ) : orderConfirmed ? (
                      <div className="flex items-center justify-center mb-4">
                        <p className="font-bold text-lg">Order has been paid</p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center mb-4">
                        {isPaymentSuccessful ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-green-500 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-red-500 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a1 1 0 100-2 1 1 0 000 2zM10 14a1 1 0 100-2 1 1 0 000 2zm0-8a1 1 0 00-1 1v4a1 1 0 102 0V7a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        <p className="font-bold text-lg">
                          {isPaymentSuccessful
                            ? "Payment successful"
                            : "Payment failed"}
                        </p>
                      </div>
                    )}
                    <div className="flex justify-center">
                      <button
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        onClick={handleCloseModal}
                      >
                        OK
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

function Modal(props: ModalProps) {
  const { isOpen, onClose, title, children } = props;
  const router = useRouter();
  const handleClose = () => {
    onClose(); // Close the modal
    router.push("/");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleClose}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mt-2">{children}</div>
        </div>
      </div>
    </div>
  );
}
export default BodyOrder;
