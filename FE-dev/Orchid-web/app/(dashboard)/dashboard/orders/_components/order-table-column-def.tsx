"use client";

import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/types/table";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";


import { MdOutlinePending } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FcCancel } from "react-icons/fc";
import { BiSolidBank } from "react-icons/bi";
import { FaWallet } from "react-icons/fa";
import { IOrder } from "@/types/dashboard";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { CircleDashed, Edit, Eye } from "lucide-react";
import { ModalData, ModalType } from "@/hooks/use-modal";

export function fetchOrderTableColumnDefs(
  isPending: boolean,
  startTransition: React.TransitionStartFunction,
  router: AppRouterInstance,
  onOpen: (type: ModalType, data: ModalData) => void
): ColumnDef<IOrder, unknown>[] {
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
        <DataTableColumnHeader column={column} title="OrderId" />
      ),
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "phone",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Phone" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("phone")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "productName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="productName" />
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
      accessorKey: "productCode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="productCode" />
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
      accessorKey: "total",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total Price" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("total")}
               
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="quantity" />
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
      accessorKey: "paymentMethod",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="paymentMethod" />
      ),
      cell: ({ row }) => {
        const paymentMethod = row.original.paymentMethod;

        let paymentMethodText;
        let paymentMethodIcon;
        let paymentMethodColor;
        if (paymentMethod === "BANK") {
          paymentMethodText = "BANK";
          paymentMethodIcon = (
            <BiSolidBank
              className="mr-2 size-6 text-muted-foreground text-yellow-500 font-bold"
              aria-hidden="true"
            />
          );
          paymentMethodColor = "text-yellow-500";
        } else {
          paymentMethodText = "CARD";
          paymentMethodColor = "text-green-500";
          paymentMethodIcon = (
            <FaWallet
              className="mr-2 size-6 text-muted-foreground text-green-500 font-bold"
              aria-hidden="true"
            />
          );
        }

        return (
          <div className="flex items-center  w-full h-14 rounded-md px-2">
            <span>{paymentMethodIcon}</span>
            <span className={`capitalize ${paymentMethodColor}`}>
              {paymentMethodText}
            </span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value instanceof Array && value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.original.status;
        const confirmed = row.original.confirmed; // boolean
      
        let statusText;
        let statusIcon;
        let statusColor;
        if (status === "PENDING") {
          statusText = "Đang chờ thanh toán";
          statusIcon = (
            <MdOutlinePending
              className="mr-2 size-6 text-muted-foreground text-yellow-500 font-bold"
              aria-hidden="true"
            />
          );
          statusColor = "text-yellow-500";
        } else if (status === "CONFIRMED") {
          if (confirmed) {
            statusText = "Thanh toán hoàn tất";
            statusColor = "text-green-500";
            statusIcon = (
              <FaRegCircleCheck
                className="mr-2 size-6 text-muted-foreground text-green-500 font-bold"
                aria-hidden="true"
              />
            );
          } else {
            statusText = "Chờ xác nhận";
            statusColor = "text-orange-500";
            statusIcon = (
              <CircleDashed
                className="mr-2 size-6 text-muted-foreground text-orange-500 font-bold"
                aria-hidden="true"
              />
            );
          }
        } else if (status === "FAILED") {
          statusText = "Thanh toán đơn bị hủy";
          statusIcon = (
            <FcCancel
              className="mr-2 size-6 text-muted-foreground text-red-500 font-bold"
              aria-hidden="true"
            />
          );
          statusColor = "text-red-500";
        } else {
          statusText = status;
          statusIcon = (
            <FcCancel
              className="mr-2 size-6 text-muted-foreground"
              aria-hidden="true"
            />
          );
          statusColor = "";
        }
      
        return (
          <div className="flex items-center bg-slate-700 w-full h-14 rounded-md px-2">
            <span>{statusIcon}</span>
            <span className={`capitalize ${statusColor}`}>{statusText}</span>
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
            {row.original.status === "CONFIRMED" && !row.original.confirmed ? (
              <DropdownMenuItem
                onClick={() =>
                  onOpen("confirmOrder", { order: row.original })
                }
              >
                <Edit className="mr-2 h-4 w-4" /> Confirm
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={() => onOpen("viewInfoOrder", { order: row.original })}
              >
                <Eye className="mr-2 h-4 w-4" /> View Details
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    }
  ];
}

export const filterableColumns: DataTableFilterableColumn<IOrder>[] = [
  {
    id: "status",
    title: "status",
    options: ["PENDING", "CONFIRMED", "FAILED"].map((status) => ({
      label: status[0]?.toUpperCase() + status.slice(1),
      value: status,
    })),
  },
  {
    id: "paymentMethod",
    title: "paymentMethod",
    options: ["BANK", "CARD"].map((status) => ({
      label: status[0]?.toUpperCase() + status.slice(1),
      value: status,
    })),
  },
];

export const searchableColumns: DataTableSearchableColumn<IOrder>[] = [
  {
    id: "productName",
    title: "productName",
  },
];
