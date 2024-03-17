"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";

import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";

import {
  searchableColumns,
  filterableColumns,
  fetchOrderTableColumnDefs,
} from "./order-table-column-def";
import { useRouter } from "next/navigation";
import { getTransactions } from "@/lib/actions/transaction";
import { IOrder } from "@/types/dashboard";
import { getOrders } from "@/lib/actions";
import { useModal } from "@/hooks/use-modal";

interface OrdersTableProps {
  orderPromise: ReturnType<typeof getOrders>;
}

export function OrderTable({ orderPromise }: OrdersTableProps) {
  const { data, pageCount } = React.use(orderPromise);
  const [isPending, startTransition] = React.useTransition();

  const { onOpen } = useModal();
  const router = useRouter();
  const columns = React.useMemo<ColumnDef<IOrder, unknown>[]>(
    () => fetchOrderTableColumnDefs(isPending, startTransition, router, onOpen),
    [isPending, router, onOpen]
  );
  const { dataTable } = useDataTable({
    data,
    columns,
    pageCount,
    searchableColumns,
    filterableColumns,
  });

  return (
    <div className="space-y-4 overflow-hidden">
      <DataTable
        dataTable={dataTable}
        columns={columns}
        searchableColumns={searchableColumns}
        filterableColumns={filterableColumns}
        //   floatingBarContent={TasksTableFloatingBarContent(dataTable)}
        //   deleteRowsAction={(event) => deleteSelectedRows(dataTable, event)}
      />
    </div>
  );
}
