"use client";

import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/types/table";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, XCircle } from "lucide-react";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { IProduct } from "@/types/dashboard";
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

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Edit } from "lucide-react";
import { toast } from "sonner";
import { deleteProductByID, updateStatusProduct } from "@/lib/actions";

export function fetchProductsTableColumnDefs(
  isPending: boolean,
  startTransition: React.TransitionStartFunction,
  router: AppRouterInstance
): ColumnDef<IProduct, unknown>[] {
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
        <DataTableColumnHeader column={column} title="ProductID" />
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
      accessorKey: "actived",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="actived" />
      ),
      cell: ({ row }) => {
        const isActived = row.getValue("actived");
        return (
          <div className="flex items-center space-x-2 ">
            {isActived ? (
              <CheckCircle className="text-green-500" size={20} />
            ) : (
              <XCircle className="text-red-500" size={20} />
            )}
            <span>{isActived ? "Active" : "Inactive"}</span>
          </div>
        );
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
            <DropdownMenuItem
              onClick={() =>
                router.push(`/dashboard/products/${row.original.id}`)
              }
            >
              <Edit className="mr-2 h-4 w-4" /> Chỉnh sửa
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={row.original.actived.toString()}
                  onValueChange={(value) => {
                    startTransition(() => {
                      toast.promise(
                        updateStatusProduct({
                          id: row.original.id,
                          status: value.toString(),
                        }),
                        {
                          loading: "Update...",
                          success: () => "Product update successfully.",
                          error: (err) => `Update error: ${err.message}`,
                        }
                      );
                    });
                  }}
                >
                  {["true", "false"].map((status) => (
                    <DropdownMenuRadioItem
                      key={status.toString()}
                      value={status.toString()}
                      className="capitalize"
                    >
                      {status ? "active sản phẩm" : "unactive sản phẩm"}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                startTransition(() => {
                  row.toggleSelected(false);
                  toast.promise(deleteProductByID(row.original.id.toString()), {
                    loading: "Deleting...",
                    success: () => "Product deleted successfully.",
                    // error: (err: unknown) => catchError(err),
                    error: () => "Dellete error",
                  });
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

export const searchableColumns: DataTableSearchableColumn<IProduct>[] = [
  {
    id: "productName",
    title: "productName",
  },
];
