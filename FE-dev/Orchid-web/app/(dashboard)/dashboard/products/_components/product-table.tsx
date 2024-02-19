"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";

import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";
import { productFakeData } from "./fake-product-data";
import { IProduct } from "@/types/dashboard";
import { fetchProductsTableColumnDefs,searchableColumns } from "./product-table-column-def";



interface ProductsTableProps {
    productPromise: ReturnType<typeof productFakeData>;
}

export function ProductTable({ productPromise }: ProductsTableProps) {
  const {data, pageCount} = React.use(productPromise);
  const [isPending, startTransition] = React.useTransition();

  const columns = React.useMemo<ColumnDef<IProduct, unknown>[]>(
    () => fetchProductsTableColumnDefs(isPending, startTransition),
    [isPending]
  );

  const { dataTable } = useDataTable({
    data,
    columns,
    pageCount,
    searchableColumns,
    // filterableColumns,
  });

  return (
    <DataTable
      dataTable={dataTable}
      columns={columns}
      searchableColumns={searchableColumns}
    //   filterableColumns={filterableColumns}
      //   floatingBarContent={TasksTableFloatingBarContent(dataTable)}
      //   deleteRowsAction={(event) => deleteSelectedRows(dataTable, event)}
    />
  );
}
