import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RightSidebar from "@/components/dashboard/user/RightSidebar";

// fake data
import { SearchParams } from "@/types/table";
import { Shell } from "@/components/shell";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { getDataFake } from "./_components/fake-data";
import { TasksTable } from "./_components/users-table";
export interface IndexPageProps {
  searchParams: SearchParams;
}

const UsersPage = async ({ searchParams }: IndexPageProps) => {
  const tasksPromise = getDataFake(searchParams);

  return (
    <>
      <div className="2xl:flex-1 w-full">
        <Tabs defaultValue="staff" className="w-full ">
          <TabsList>
            <TabsTrigger value="staff">Nhân viên</TabsTrigger>
            <TabsTrigger value="user">Khách hàng</TabsTrigger>
          </TabsList>
          <TabsContent value="staff">Nhân viên here</TabsContent>
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
                <TasksTable tasksPromise={tasksPromise} />
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
