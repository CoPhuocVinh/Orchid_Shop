"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Grid_DashBoard_table from "./dashboard-profile";
import Grid_My_Profile from "./my-profile";
import Grid_Order_Data_Table from "./table-orders";

import Grid_Address_Default from "./my-address";

function Nav_Menu() {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <div className="flex flex-row">
      <div className="container mx-auto mt-12 h-full w-66">
        <div className="justify-center items-center h-screen">
          <div className=" md:gap-4">
            <div className=" mx-auto mt-12 items-center">
              <div className="flex flex-row  justify-center  gap-10">
                <ul className="flex flex-col gap-5 py-4 w-96 font-mono text-2xl font-bold pt-10">
                  <li>
                    {/* <a href="#"></a> */}
                    <button
                      onClick={() => setOpenTab(1)}
                      className={`hover:bg-green-500 w-full ${
                        openTab === 1 ? "bg-green-400 text-black" : "bg-white"
                      } inline-block px-4 py-2 text-gray-600  bg-green-500 rounded  `}
                    >
                      DashBoard
                    </button>
                  </li>
                  <li>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="flex items-center justify-center">
                          My Account
                        </AccordionTrigger>
                        <AccordionContent>
                          <button
                            onClick={() => setOpenTab(2)}
                            className={`hover:bg-green-500 w-full ${
                              openTab === 2
                                ? "bg-green-400 text-black "
                                : "bg-white"
                            } inline-block px-4 py-2 text-gray-600 bg-green-500  rounded `}
                          >
                            My Profile
                          </button>
                        </AccordionContent>
                        <AccordionContent>
                          <button
                            onClick={() => setOpenTab(4)}
                            className={`hover:bg-green-500 w-full ${
                              openTab === 4
                                ? "bg-green-400 text-black "
                                : "bg-white"
                            } inline-block px-4 py-2 text-gray-600 bg-green-500  rounded `}
                          >
                            My Address
                          </button>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    {/* <a href="#"></a> */}
                  </li>
                  <li>
                    <button
                      onClick={() => setOpenTab(3)}
                      className={`hover:bg-green-500 w-full ${
                        openTab === 3 ? "bg-green-400 text-black " : "bg-white"
                      } inline-block px-4 py-2 text-gray-600 bg-green-500 rounded `}
                    >
                      Order Biding
                    </button>
                  </li>
                  <li>
                    <button className="hover:bg-green-500 text-black  bg-white inline-block px-4 py-2 w-full rounded-md">
                      Logout
                    </button>
                  </li>
                </ul>
                <div className="p-3 mt-6 bg-white border w-full">
                  <div className={openTab === 1 ? "block " : "hidden"}>
                    {openTab === 1 && <Grid_DashBoard_table />}
                  </div>
                  <div className={openTab === 2 ? "block" : "hidden"}>
                    {openTab === 2 && <Grid_My_Profile />}
                  </div>
                  <div className={openTab === 3 ? "block " : "hidden"}>
                    {openTab === 3 && <Grid_Order_Data_Table />}
                  </div>
                  <div className={openTab === 4 ? "block " : "hidden"}>
                    {openTab === 4 && <Grid_Address_Default />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav_Menu;
