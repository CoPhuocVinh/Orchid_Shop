import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/data-table";
import RightSidebar from "@/components/dashboard/user/RightSidebar";
import { Customer, customerColumns } from "./_components/customer-column";
import { User, staffColumns } from "./_components/staff-columns";

async function getData(): Promise<User[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      name: "vinh",
      location: "USSA",
      email: "m@example.com",
      role: "staff",
      spent: 200,
    },
    {
      id: "2",
      name: "fuzzy",
      location: "USSA",
      email: "112m@example.com",
      role: "staff",
      spent: 200,
    },
    {
      id: "3",
      name: "fuzzy",
      location: "USSA",
      email: "112m@example.com",
      role: "staff",
      spent: 200,
    },
    {
      id: "4",
      name: "fuzzy",
      location: "USSA",
      email: "112m@example.com",
      role: "staff",
      spent: 200,
    },
    {
      id: "5",
      name: "fuzzy",
      location: "USSA",
      email: "112m@example.com",
      role: "staff",
      spent: 200,
    },
    {
      id: "6",
      name: "fuzzy",
      location: "USSA",
      email: "112m@example.com",
      role: "staff",
      spent: 200,
    },
    {
      id: "7",
      name: "fuzzy",
      location: "USSA",
      email: "112m@example.com",
      role: "staff",
      spent: 200,
    },
    {
      id: "8",
      name: "fuzzy",
      location: "USSA",
      email: "112m@example.com",
      role: "staff",
      spent: 200,
    },
    {
      id: "9",
      name: "fuzzy",
      location: "USSA",
      email: "112m@example.com",
      role: "staff",
      spent: 200,
    },
    {
      id: "10",
      name: "fuzzy",
      location: "USSA",
      email: "112m@example.com",
      role: "staff",
      spent: 200,
    },
    {
      id: "11",
      name: "fuzzy",
      location: "USSA",
      email: "112m@example.com",
      role: "staff",
      spent: 200,
    },
    {
      id: "12",
      name: "fuzzy",
      location: "USSA",
      email: "112m@example.com",
      role: "staff",
      spent: 200,
    },

  ];
}

async function getDataCustomer(): Promise<Customer[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      name: " customer_1",
      location: "USSA",
      email: "m@example.com",
      spent: 200,
    },
    {
      id: "2",
      name: "customer_2",
      location: "USSA",
      email: "112m@example.com",
      spent: 200,
    },

  ];
}

const UsersPage = async () => {
  const data = await getData();
  const customerData = await getDataCustomer()

  return (
    <>
      <div className="2xl:flex-1 w-full">
        <Tabs defaultValue="staff" className="w-full ">
          <TabsList>
            <TabsTrigger value="staff">Nhân viên</TabsTrigger>
            <TabsTrigger value="user">Khách hàng</TabsTrigger>
          </TabsList>
          <TabsContent value="staff">
            Nhân viên here
            <DataTable
              columns={staffColumns}
              data={data}
              searchKey="email"
            />
          </TabsContent>
          <TabsContent value="user">
            Khách hàng here.
            <DataTable columns={customerColumns} data={customerData} searchKey="email" />
          </TabsContent>
        </Tabs>
      </div>
      <RightSidebar />
    </>
  );
};

export default UsersPage;
