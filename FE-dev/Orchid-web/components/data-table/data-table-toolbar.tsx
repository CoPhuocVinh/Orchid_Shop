import { Table } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Icons } from "../icons";
import { statuses } from "./filter-type";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableFilterableColumn } from "@/types/table";
import { DataTableViewOptions } from "./data-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchKey: string;
  filterKey?: string;
  filterableColumns?: DataTableFilterableColumn<TData>[];
}

export function DataTableToolbar<TData>({
  table,
  searchKey,
  filterableColumns,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={`Tìm kiếm bằng ${searchKey}`}
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {filterableColumns!.length > 0 &&
          filterableColumns!.map(
            (column) =>
              table.getColumn(column.id ? String(column.id) : "") && (
                <DataTableFacetedFilter
                  key={String(column.id)}
                  column={table.getColumn(column.id ? String(column.id) : "")}
                  title={column.title}
                  options={column.options}
                />
              )
          )}
        {/* {table.getColumn(filterKey!) && (
            <DataTableFacetedFilter
              column={table.getColumn(filterKey!)}
              title="Status"
              options={statuses}
            />
          )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Icons.cancel className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
