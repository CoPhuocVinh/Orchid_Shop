"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";

import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";

import {
  searchableColumns,
  filterableColumns,
  fetchTransactionTableColumnDefs
} from "./transaction-table-column-def";
import { useRouter } from "next/navigation";
import { getTransactionByUserId, getTransactions } from "@/lib/actions/transaction";
import { IOrder, ITransaction } from "@/types/dashboard";
import { getOrders } from "@/lib/actions";

interface OrdersTableProps {
  transactionPromise: ReturnType<typeof getTransactionByUserId>;
}

export function TransactionTable({ transactionPromise }: OrdersTableProps) {
  const { data, pageCount } = React.use(transactionPromise);
  const [isPending, startTransition] = React.useTransition();
  // console.log(data)
  const router = useRouter();
  const columns = React.useMemo<ColumnDef<ITransaction, unknown>[]>(
    () => fetchTransactionTableColumnDefs(isPending, startTransition, router),
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
