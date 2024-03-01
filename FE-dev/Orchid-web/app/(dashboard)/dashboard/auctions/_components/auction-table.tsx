"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";

import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";

import { IAuction } from "@/types/dashboard";
import {
  fetchAutionsTableColumnDefs,
  searchableColumns,
  filterableColumns,
} from "./auction-table-column-def";
import { getTableAuctions } from "@/lib/actions/auction";

interface AutionsTableProps {
  auctionPromise: ReturnType<typeof getTableAuctions>;
}

export function AuctionTable({ auctionPromise }: AutionsTableProps) {
  const { data, pageCount } = React.use(auctionPromise);
  const [isPending, startTransition] = React.useTransition();
  // console.log(data)
  const columns = React.useMemo<ColumnDef<IAuction, unknown>[]>(
    () => fetchAutionsTableColumnDefs(isPending, startTransition),
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
