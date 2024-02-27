"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";

import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";

import {
  fetchTasksTableColumnDefs,
  filterableColumns,
  searchableColumns,
} from "./users-table-column-def";
import { IUser } from "@/types/dashboard";

interface UsersTableProps {
  userType: "staff" | "user"
  staffs?: IUser[] ;
  users?: IUser[] ;
  pageCount: number
}

export function UsersTable({ staffs , users , userType, pageCount }: UsersTableProps) {
  // const { data, pageCount } = React.use(customerUserPromise);
  const [isPending, startTransition] = React.useTransition();
  const data = userType === "staff" ? staffs : users
  const columns = React.useMemo<ColumnDef<IUser, unknown>[]>(
    () => fetchTasksTableColumnDefs(isPending, startTransition),
    [isPending]
  );

  const { dataTable } = useDataTable({
    data: data ?? [],
    columns,
    pageCount,
    searchableColumns,
    filterableColumns,
  });

  return (
    <DataTable
      dataTable={dataTable}
      columns={columns}
      searchableColumns={searchableColumns}
      filterableColumns={filterableColumns}
      //   floatingBarContent={TasksTableFloatingBarContent(dataTable)}
      //   deleteRowsAction={(event) => deleteSelectedRows(dataTable, event)}
    />
  );
}
