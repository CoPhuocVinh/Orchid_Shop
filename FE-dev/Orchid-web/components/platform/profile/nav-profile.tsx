import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Grid_DashBoard_table from "./dashboard-profile";
import Grid_My_Profile from "./my-profile";
import Grid_Address_Default from "./my-address";
import { SearchParams } from "@/types/table";
import { getOrdersByUserId } from "@/lib/actions";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Shell } from "@/components/shell";
import { OrderTable } from "./profile-order/order-table";
import { auth } from "@/lib/auth";
import { getTransactionByUserId } from "@/lib/actions/transaction";
import { TransactionTable } from "./profile-transaction/transaction-table";

export interface IndexPageProps {
  searchParams: SearchParams;
}
async function NavMenu({ searchParams }: IndexPageProps) {
  const session = await auth();
  const orders = getOrdersByUserId(searchParams, session?.user.id!);
  const transactions = getTransactionByUserId(searchParams, session?.user.id!);
  return (
    <div className="flex flex-row">
      <div className="container mx-auto mt-12 h-full w-88">
        <div className="justify-center items-center h-screen">
          <div className=" md:gap-4">
            <div className=" mx-auto mt-12 items-center">
              <div className="flex flex-row  justify-center  gap-10">
                <div className="p-3 mt-6 w-full">
                  <Tabs defaultValue="dashboard" className="flex">
                    <TabsList className="flex relative bg-white ">
                      <ul className="flex flex-col gap-5 py-4 w-96 font-mono text-xl font-bold pt-80">
                        <li>
                          <TabsTrigger
                            value="dashboard"
                            className="hover:bg-green-500 mt-20 w-full  text-xl font-normal bg-white text-black inline-block px-4 py-2 rounded"
                          >
                            DashBoard
                          </TabsTrigger>
                        </li>
                        <li>
                          <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                          >
                            <AccordionItem value="item-1">
                              <AccordionTrigger className="flex items-center justify-center font-normal   mr-2 py-2 text-xl text-gray-600">
                                My Account
                              </AccordionTrigger>
                              <AccordionContent>
                                <TabsTrigger
                                  value="profile"
                                  className="hover:bg-green-500 w-full font-normal text-xl inline-block px-4 py-2 text-gray-600 bg-white rounded"
                                >
                                  My Profile
                                </TabsTrigger>
                              </AccordionContent>
                              <AccordionContent>
                                <TabsTrigger
                                  value="address"
                                  className="hover:bg-green-500 w-full font-normal text-xl inline-block px-4 py-2 text-gray-600 bg-white rounded"
                                >
                                  My Address
                                </TabsTrigger>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </li>
                        <li>
                          <TabsTrigger
                            value="orders"
                            className="hover:bg-green-500 w-full  inline-block px-4 py-2 font-normal text-xl  text-gray-600 bg-white rounded"
                          >
                            Order Biding
                          </TabsTrigger>
                        </li>
                        <li>
                          <TabsTrigger
                            value="transactions"
                            className="hover:bg-green-500 w-full  inline-block px-4 py-2 font-normal text-xl  text-gray-600 bg-white rounded"
                          >
                            Transaction
                          </TabsTrigger>
                        </li>
                      </ul>
                    </TabsList>

                    <div className="w-full border bg-white">
                      <TabsContent value="dashboard">
                        <Grid_DashBoard_table />
                      </TabsContent>
                      <TabsContent value="profile">
                        <Grid_My_Profile />
                      </TabsContent>
                      <TabsContent value="address">
                        <Grid_Address_Default />
                      </TabsContent>
                      <TabsContent value="orders">
                        <Shell>
                          <React.Suspense
                            fallback={
                              <DataTableSkeleton
                                columnCount={4}
                                filterableColumnCount={2}
                              />
                            }
                          >
                            <div className="overflow-x-auto">
                              <OrderTable orderPromise={orders} />
                            </div>
                          </React.Suspense>
                        </Shell>
                      </TabsContent>
                      <TabsContent value="transactions">
                        <Shell>
                          <React.Suspense
                            fallback={
                              <DataTableSkeleton
                                columnCount={4}
                                filterableColumnCount={2}
                              />
                            }
                          >
                            <div className="overflow-x-auto">
                              <TransactionTable
                                transactionPromise={transactions}
                              />
                            </div>
                          </React.Suspense>
                        </Shell>
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavMenu;
