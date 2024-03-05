import React, { useState } from "react";

import { AlertOctagon, Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GetApi_Province from "@/app/(platform)/order/_components/_lib_component/GetApi_Province";

function Grid_Address_Default() {
  const handleSubmit = () => {};
  // State for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");

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
              thêm địa chỉ mới
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Địa chỉ mới</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4 ">
                <Input
                  id="Fullname"
                  placeholder="Họ và Tên"
                  className="col-span-2 "
                />
                <Input
                  id="numberPhone"
                  placeholder="+84 399999999"
                  className="col-span-2 "
                />
              </div>
              <div className="grid grid-cols-1 items-center gap-4 ">
                <div className="flex items-center justify-center">
                  <div className="relative w-full">
                    <GetApi_Province />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4 "></div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {/* defalut  */}
      <div className="py-2">
        <Alert className="flex flex-col">
          <div className="flex justify-between items-center">
            <Terminal className="h-4 w-4" />
            <AlertTitle className="">Kain Shun</AlertTitle>
            <div className="border-1  h-full border-black ml-1 mr-1"> |</div>

            <AlertTitle className="mr-auto ">(+84) 394581438</AlertTitle>
            <AlertDescription className="ml-auto ">
              <button className="cursor-pointer text-blue-400 bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-[#60A5FA] h-9 rounded-md px-3">
                Cập nhật
              </button>
            </AlertDescription>
          </div>

          <div className="flex items-center">
            <AlertDescription className="order-1 mr-auto">
              left infomation
            </AlertDescription>
            <AlertDescription className="order-2 ml-auto">
              <button className="disabled text-gray-500 border-2-gray-500 cursor-not-allowed bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-[#60A5FA] h-9 rounded-md px-3">
                Thiết lập mặc định
              </button>
            </AlertDescription>
          </div>
          <div>
            <AlertDescription className="mb-auto">
              <label
                className=" bg-white relative inline-flex items-center 
              justify-center gap-2 text-sm font-medium
                 h-9 rounded-md px-3 border border-red-500 text-red-600"
              >
                Mặc định
              </label>
            </AlertDescription>
          </div>
        </Alert>
      </div>

      {/* new address  */}

      <div className="py-2">
        <Alert className="flex flex-col">
          <div className="flex justify-between items-center">
            <Terminal className="h-4 w-4" />
            <AlertTitle className="">Kain Shun</AlertTitle>
            <div className="border-1  h-full border-black ml-1 mr-1"> |</div>

            <AlertTitle className="mr-auto ">(+84) 394581438</AlertTitle>
            <AlertDescription className="ml-auto ">
              <button className="cursor-pointer text-blue-400 bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-[#60A5FA] h-9 rounded-md px-3">
                Cập nhật
              </button>
              <button className="cursor-pointer text-blue-400 bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-[#60A5FA] h-9 rounded-md px-3">
                Xóa
              </button>
            </AlertDescription>
          </div>

          <div className="flex items-center">
            <AlertDescription className="order-1 mr-auto">
              left infomation
            </AlertDescription>
            <AlertDescription className="order-2 ml-auto">
              <button className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-[#60A5FA] h-9 rounded-md px-3">
                Thiết lập mặc định
              </button>
            </AlertDescription>
          </div>
          <div>
            <AlertDescription className="mb-auto">
              <label
                className=" bg-white relative inline-flex items-center 
              justify-center gap-2 text-sm font-medium
                 h-9 rounded-md px-3 border border-gray-500 text-gray-500"
              >
                Mặc định
              </label>
            </AlertDescription>
          </div>
        </Alert>
      </div>

      {/* new address  */}

      <div className="py-2">
        <Alert className="flex flex-col">
          <div className="flex justify-between items-center">
            <Terminal className="h-4 w-4" />
            <AlertTitle className="">Kain Shun</AlertTitle>
            <div className="border-1  h-full border-black ml-1 mr-1"> |</div>

            <AlertTitle className="mr-auto ">(+84) 394581438</AlertTitle>
            <AlertDescription className="ml-auto ">
              <button className="cursor-pointer text-blue-400 bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-[#60A5FA] h-9 rounded-md px-3">
                Cập nhật
              </button>
              <button className="cursor-pointer text-blue-400 bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-[#60A5FA] h-9 rounded-md px-3">
                Xóa
              </button>
            </AlertDescription>
          </div>

          <div className="flex items-center">
            <AlertDescription className="order-1 mr-auto">
              left infomation
            </AlertDescription>
            <AlertDescription className="order-2 ml-auto">
              <button className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-[#60A5FA] h-9 rounded-md px-3">
                Thiết lập mặc định
              </button>
            </AlertDescription>
          </div>
          <div>
            <AlertDescription className="mb-auto">
              <label
                className=" bg-white relative inline-flex items-center 
              justify-center gap-2 text-sm font-medium
                 h-9 rounded-md px-3 border border-gray-500 text-gray-500"
              >
                Mặc định
              </label>
            </AlertDescription>
          </div>
        </Alert>
      </div>
    </>
  );
}

export default Grid_Address_Default;
