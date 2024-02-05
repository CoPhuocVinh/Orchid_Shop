"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";

import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";

import {
  Task,
  fetchTasksTableColumnDefs,
  filterableColumns,
  searchableColumns,
} from "./users-table-column-def";
import { getDataFake } from "./fake-data";

interface TasksTableProps {
  tasksPromise: ReturnType<typeof getDataFake>;
}

export function TasksTable({ tasksPromise }: TasksTableProps) {
  const {data, pageCount} = React.use(tasksPromise);
  const [isPending, startTransition] = React.useTransition();

  const columns = React.useMemo<ColumnDef<Task, unknown>[]>(
    () => fetchTasksTableColumnDefs(isPending, startTransition),
    [isPending]
  );

  const { dataTable } = useDataTable({
    data,
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
