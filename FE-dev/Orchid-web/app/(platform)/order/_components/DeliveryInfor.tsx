import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GetListProvince from "./_lib_component/GetListProvince";
import { Input } from "@/components/ui/input";
function DeliveryInfor() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const [delivery, setDelivery] = useState("office");

  const [ward, setWard] = useState("");

  return (
    <div className="flex items-center justify-center w-full">
      <div className="rounded-xl border bg-card text-card-foreground shadow w-full">
        <div className="flex flex-col p-6 space-y-1">
          <h3 className="font-semibold tracking-tight text-2xl">
            Delivery Information
          </h3>
        </div>
        <div className="p-6 pt-0 grid gap-4">
          <div className="relative"></div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <div className="grid gap-2 mt-8 ">
                <label
                  htmlFor="fullName"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="First Last"
                  onChange={(e) => setFullName(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="grid gap-2 mt-8">
                <label
                  htmlFor="Phone number"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Phone Number
                </label>
                <input
                  type="number"
                  id="PhoneNumber"
                  placeholder="Please enter your phone number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>

            <div className="col-span-1">
              <div className="grid gap-2  mt-8 ">
                <label
                  htmlFor="Address"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="Address"
                  placeholder="Please enter your address"
                  onChange={(e) => setAddress(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="grid gap-2  mt-8 ">
                <label
                  htmlFor="Province"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Province
                </label>

                <GetListProvince />
              </div>
              <div className="grid gap-2  mt-8 ">
                <label
                  htmlFor="Ward"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Ward
                </label>
                <Input
                  id="Ward"
                  value={ward}
                  placeholder="Enter your Ward"
                  onChange={(e) => setWard(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2  mt-8 ">
                  Delivery
                </label>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    id="office"
                    name="delivery"
                    value="office"
                    //   checked={delivery === "office"}
                    onChange={() => setDelivery("office")}
                    className="mr-2 w-1/6 border border-blue-500"
                  >
                    <svg
                      className="h-8 w-8 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    OFFICE
                  </Button>
                  <Button
                    variant="outline"
                    id="home"
                    name="delivery"
                    value="home"
                    onChange={() => setDelivery("home")}
                    className="flex items-center justify-center mr-2 w-1/6 border border-red-500"
                  >
                    <svg
                      className="h-8 w-8 text-red-500"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <polyline points="5 12 3 12 12 3 21 12 19 12" />{" "}
                      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />{" "}
                      <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                    </svg>
                    HOME
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end p-6 pt-0 mt-8 ">
          <Button className="bg-lime-600  hover:bg-orange-600 w-40">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeliveryInfor;
