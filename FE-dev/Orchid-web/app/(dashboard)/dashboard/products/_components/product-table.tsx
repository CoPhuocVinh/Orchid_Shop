"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";

import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";

import { IProduct } from "@/types/dashboard";
import {
  fetchProductsTableColumnDefs,
  searchableColumns,
} from "./product-table-column-def";
import { getProducts } from "@/lib/actions";
import { useRouter } from "next/navigation";

interface ProductsTableProps {
  productPromise: ReturnType<typeof getProducts>;
}

export function ProductTable({ productPromise }: ProductsTableProps) {
  const { data, pageCount } = React.use(productPromise);
  const [isPending, startTransition] = React.useTransition();
  // console.log(data)
  const router = useRouter();
  const columns = React.useMemo<ColumnDef<IProduct, unknown>[]>(
    () => fetchProductsTableColumnDefs(isPending, startTransition, router),
    [isPending, router]
  );
  const { dataTable } = useDataTable({
    data,
    columns,
    pageCount,
    searchableColumns,
    // filterableColumns,
  });

  return (
    <div className="space-y-4 overflow-hidden">
      <DataTable
        dataTable={dataTable}
        columns={columns}
        searchableColumns={searchableColumns}
        //   filterableColumns={filterableColumns}
        //   floatingBarContent={TasksTableFloatingBarContent(dataTable)}
        //   deleteRowsAction={(event) => deleteSelectedRows(dataTable, event)}
      />
    </div>
  );
}
