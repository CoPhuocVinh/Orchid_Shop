"use client";

import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/types/table";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { IAuction } from "@/types/dashboard";
import { BsGenderMale } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { deleteAuction, updateStatusAuction } from "@/lib/actions/auction";

export function fetchAutionsTableColumnDefs(
  isPending: boolean,
  startTransition: React.TransitionStartFunction
): ColumnDef<IAuction, unknown>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
          }}
          aria-label="Select all"
          className="translate-y-[2px] dark:text-white"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
          className="translate-y-[2px] dark:text-white"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Auction ID" />
      ),
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "productCode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Code" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("productCode")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "productName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("productName")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Quantity" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("quantity")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "startPrice",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="startPrice" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("startPrice")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "depositPrice",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="depositPrice" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("depositPrice")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "startDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="startDate" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("startDate")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "endDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="endDate" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("endDate")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.original.status;

        if (!status) {
          return null;
        }

        return (
          <div className="flex items-center">
            {status === "WAITING" ? (
              <BsGenderMale
                className="mr-2 size-4 text-muted-foreground"
                aria-hidden="true"
              />
            ) : status === "LIVE" ? (
              <BsGenderMale
                className="mr-2 size-4 text-muted-foreground"
                aria-hidden="true"
              />
            ) : status === "APPROVE" ? (
              <BsGenderMale
                className="mr-2 size-4 text-muted-foreground"
                aria-hidden="true"
              />
            ) : status === "END" ? (
              <BsGenderMale
                className="mr-2 size-4 text-muted-foreground"
                aria-hidden="true"
              />
            ) : (
              <BsGenderMale
                className="mr-2 size-4 text-muted-foreground"
                aria-hidden="true"
              />
            )}
            <span className="capitalize">{status}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value instanceof Array && value.includes(row.getValue(id));
      },
    },

    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-label="Open menu"
              variant="ghost"
              className="flex size-8 p-0 data-[state=open]:bg-muted"
            >
              <DotsHorizontalIcon className="size-4" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={row.original.status}
                  onValueChange={(value) => {
                    startTransition(() => {
                      toast.promise(
                        updateStatusAuction({
                          id: row.original.id,
                          status: value as IAuction["status"],
                        }),
                        {
                          loading: "Update...",
                          success: () => "Auction update successfully.",
                          // error: (err: unknown) => catchError(err),
                          error: () => "Dellete error",
                        }
                      );
                    });
                  }}
                >
                  {["WAITING", "LIVE", "APPROVE", "END", "COMING"].map(
                    (status) => (
                      <DropdownMenuRadioItem
                        key={status}
                        value={status}
                        className="capitalize"
                        // disabled={isPending}
                      >
                        {status}
                      </DropdownMenuRadioItem>
                    )
                  )}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                startTransition(() => {
                  row.toggleSelected(false);
                  toast.promise(
                    deleteAuction({
                      id: row.original.id,
                    }),
                    {
                      loading: "Deleting...",
                      success: () => "Auction deleted successfully.",
                      // error: (err: unknown) => catchError(err),
                      error: () => "Dellete error",
                    }
                  );
                });
              }}
            >
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
}

export const filterableColumns: DataTableFilterableColumn<IAuction>[] = [
  {
    id: "status",
    title: "status",
    options: ["WAITING", "LIVE", "APPROVE", "END", "COMING"].map((status) => ({
      label: status[0]?.toUpperCase() + status.slice(1),
      value: status,
    })),
  },
];

export const searchableColumns: DataTableSearchableColumn<IAuction>[] = [
  {
    id: "productName",
    title: "productName",
  },
];
