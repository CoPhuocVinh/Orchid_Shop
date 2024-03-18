"use client";

import React from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GetApi_Province from "@/components/platform/profile/modal-address";
import { useGetAddress } from "@/lib/react-query/queries";
import { useSession } from "next-auth/react";

function Grid_Address_Default() {
  const { data: session } = useSession();
  const { data: adressLists } = useGetAddress(session?.user.id! || "1");

  
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
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="mr-auto">Địa chỉ của tôi</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto bg-orange-400 py-3 px-6"
            >
              Thêm địa chỉ mới
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Địa chỉ mới</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 items-center gap-4 ">
                <div className="flex items-center justify-center">
                  <div className="relative w-full">
                    <GetApi_Province />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4 "></div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {adressLists?.data &&
        sortAddresses(adressLists.data).map((address: any) => (
          <div key={address.id} className="py-2">
            <Alert className="flex flex-col">
              <div className="flex justify-between items-center">
                <AlertTitle className="">{address.info_name}</AlertTitle>
               
                <AlertTitle className="mr-auto">{address.phone}</AlertTitle>
                <AlertDescription className="ml-auto">
                  <button className="cursor-pointer text-blue-400 bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-[#60A5FA] h-9 rounded-md px-3">
                    Cập nhật
                  </button>
                </AlertDescription>
              </div>
              <div className="flex items-center">
                <AlertDescription className="order-1 mr-auto">
                  {address.address}
                </AlertDescription>
                <AlertDescription className="order-2 ml-auto">
                  <button className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-[#60A5FA] h-9 rounded-md px-3">
                    Thiết lập mặc định
                  </button>
                </AlertDescription>
              </div>
              <div>
                <AlertDescription className="mb-auto">
                  {/* Indicate if it's a default address */}
                  {address.defaulted && (
                    <label className=" bg-white relative inline-flex items-center justify-center gap-2 text-sm font-medium h-9 rounded-md px-3 border border-red-500 text-red-600">
                      Mặc định
                    </label>
                  )}
                </AlertDescription>
              </div>
            </Alert>
          </div>
        ))}
    </>
  );
}

export default Grid_Address_Default;
