import React, { useState } from "react";

import { AlertOctagon, Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


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
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      className="border-b col-span-4 border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
                    />
                    <label
                      htmlFor="username"
                      className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700 px-2 text-gray-500"
                    >
                      Tỉnh/Thành Phố, Quận/Huyện, Phường/Xã
                    </label>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4 ">
              
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="py-2">
        <Alert className="flex flex-col">
          <div className="flex justify-between items-center">
            <Terminal className="h-4 w-4" />
            <AlertTitle className="mr-auto">Kain Shun</AlertTitle>

            <AlertDescription>test</AlertDescription>
            <AlertDescription className="ml-auto ">
              You can add components to your app using the cli.
            </AlertDescription>
          </div>

          <div>
            <AlertDescription className="mb-auto">qwertyuyiou</AlertDescription>
          </div>
          <div>
            <AlertDescription className="mb-auto">qwertyuyiou</AlertDescription>
          </div>
          <div>
            <AlertDescription className="mb-auto">qwertyuyiou</AlertDescription>
          </div>
        </Alert>
      </div>
      <div className="py-2">
        <Alert className="flex justify-between items-center">
          <Terminal className="h-4 w-4" />
          <AlertTitle className="mr-auto">Heads up!</AlertTitle>
          <AlertDescription className="ml-auto ">
            You can add components to your app using the cli.
          </AlertDescription>
        </Alert>
      </div>
      <div className="py-2">
        <Alert className="flex justify-between items-center">
          <Terminal className="h-4 w-4" />
          <AlertTitle className="mr-auto">Heads up!</AlertTitle>
          <AlertDescription className="ml-auto ">
            You can add components to your app using the cli.
          </AlertDescription>
        </Alert>
      </div>
    </>
  );
}

export default Grid_Address_Default;
