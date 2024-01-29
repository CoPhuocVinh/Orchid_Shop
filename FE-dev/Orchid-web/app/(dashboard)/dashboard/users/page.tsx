import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RightSidebar from "@/components/dashboard/user/RightSidebar";
import { Customer, customerColumns } from "./_components/customer-column";
import { User, staffColumns } from "./_components/staff-columns";
import { DataTable } from "@/components/data-table/data-table";
import { statuses } from "@/components/data-table/filter-type";

// fake data
import { DataTableFilterableColumn } from "@/types/table";
import { getData, getDataCustomer } from "./_components/fake-data-cal-api";
import { Shell } from "@/components/shell";
import DataTableSkeleton from "@/components/data-table/data-table-skeleton";

const UsersPage = async () => {
  const data = await getData();
  const customerData = await getDataCustomer();

  const filterableColumns: DataTableFilterableColumn<Customer>[] = [
    {
      id: "status",
      title: "Status",
      // options: ["done", "todo"].map((status) => ({
      //   label: status,
      //   value: status,
      // })),,
      options: statuses.map((status) => ({
        label: status.label,
        value: status.value,
      })),
    },
  ];

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
            <DataTable columns={staffColumns} data={data} searchKey="email" />
          </TabsContent>
          <TabsContent value="user">
            Khách hàng here.
            <Shell>
              <React.Suspense
                fallback={
                  <DataTableSkeleton
                    columnCount={4}
                    filterableColumnCount={2}
                  />
                }
              >
                <DataTable
                  columns={customerColumns}
                  data={customerData}
                  searchKey="email"
                  filterableColumns={filterableColumns}
                />
              </React.Suspense>
            </Shell>
          </TabsContent>
        </Tabs>
      </div>
      <RightSidebar />
    </>
  );
};

export default UsersPage;
