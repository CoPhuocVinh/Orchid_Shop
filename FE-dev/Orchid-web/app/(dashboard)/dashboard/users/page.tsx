"use client";

import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RightSidebar from "@/components/dashboard/user/RightSidebar";

// fake data
import { SearchParams } from "@/types/table";
import { Shell } from "@/components/shell";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";

import { getUserWithRoleCustomer, getUserWithRoleStaff } from "@/lib/actions";
import { UsersTable } from "./_components/users-table";
import { IUser } from "@/types/dashboard";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/react-query/query-keys";
import { useGetStaff, useGetUsers } from "@/lib/react-query/queries";

export interface IndexPageProps {
  searchParams: SearchParams;
}

const UsersPage = ({ searchParams }: IndexPageProps) => {
  const { data: staffs, isLoading: staffLoading } = useGetStaff(searchParams);
  const { data: users, isLoading: userLoading } = useGetUsers(searchParams);

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
            <Shell>
              {staffLoading ? (
                <DataTableSkeleton columnCount={4} filterableColumnCount={2} />
              ) : (
                <UsersTable
                  userType="staff"
                  staffs={staffs?.data ?? []}
                  pageCount={staffs?.pageCount ?? 0}
                />
              )}
            </Shell>
          </TabsContent>
          <TabsContent value="user">
            Khách hàng here.
            <Shell>
              {userLoading ? (
                <DataTableSkeleton columnCount={4} filterableColumnCount={2} />
              ) : (
                <UsersTable
                  userType="user"
                  users={users?.data ?? []}
                  pageCount={users?.pageCount ?? 0}
                />
              )}
            </Shell>
          </TabsContent>
        </Tabs>
      </div>
      <RightSidebar />
    </>
  );
};

export default UsersPage;
