"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";

import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";

import {
  fetchTransactionTableColumnDefs,
  searchableColumns,
  filterableColumns,
} from "./transaction-table-column-def";
import { useRouter } from "next/navigation";
import { ITransaction } from "@/types/dashboard/transaction-type";
import { getTransactions } from "@/lib/actions/transaction";

interface TransactionsTableProps {
  transactionPromise: ReturnType<typeof getTransactions>;
}

export function TransactionTable({
  transactionPromise,
}: TransactionsTableProps) {
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
