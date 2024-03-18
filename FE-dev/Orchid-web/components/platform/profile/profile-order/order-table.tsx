"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";

import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";

import {
  searchableColumns,
  filterableColumns,
  fetchOrderTableColumnDefs
} from "./order-table-column-def";
import { useRouter } from "next/navigation";
import { getTransactions } from "@/lib/actions/transaction";
import { IOrder } from "@/types/dashboard";
import { getOrders, getOrdersByUserId } from "@/lib/actions";

interface OrdersTableProps {
  orderPromise: ReturnType<typeof getOrdersByUserId>;
}

export function OrderTable({ orderPromise }: OrdersTableProps) {
  const { data, pageCount } = React.use(orderPromise);
  const [isPending, startTransition] = React.useTransition();
  // console.log(data)
  const router = useRouter();
  const columns = React.useMemo<ColumnDef<IOrder, unknown>[]>(
    () => fetchOrderTableColumnDefs(isPending, startTransition, router),
    [isPending, router]
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
