"use client";

import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/types/table";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { ITransaction } from "@/types/dashboard/transaction-type";
import { MdOutlinePending } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FcCancel } from "react-icons/fc";
import { BiSolidBank } from "react-icons/bi";
import { FaWallet } from "react-icons/fa";

export function fetchTransactionTableColumnDefs(
  isPending: boolean,
  startTransition: React.TransitionStartFunction,
  router: AppRouterInstance
): ColumnDef<ITransaction, unknown>[] {
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
        <DataTableColumnHeader column={column} title="TransactionID" />
      ),
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "transactionCode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="transactionCode" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("transactionCode")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Amount" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("amount")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "resource",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="resource" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("resource")
                ? row.getValue("resource")
                : "payment fail not create transaction"}
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

        let statusText;
        let statusIcon;
        let statusColor;
        if (status === "PENDING") {
          statusText = "PENDING";
          statusIcon = (
            <MdOutlinePending
              className="mr-2 size-6 text-muted-foreground text-yellow-500 font-bold"
              aria-hidden="true"
            />
          );
          statusColor = "text-yellow-500";
        } else if (status === "CONFIRMED") {
          statusText = "CONFIRMED";
          statusColor = "text-green-500";
          statusIcon = (
            <FaRegCircleCheck
              className="mr-2 size-6 text-muted-foreground text-green-500 font-bold"
              aria-hidden="true"
            />
          );
        } else if (status === "FAILED") {
          statusText = "REJECT";
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
          <div className="flex items-center dark:bg-slate-700 w-full h-14 rounded-md px-2">
            <span>{statusIcon}</span>
            <span className={`capitalize ${statusColor}`}>{statusText}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value instanceof Array && value.includes(row.getValue(id));
      },
    },
  ];
}

export const filterableColumns: DataTableFilterableColumn<ITransaction>[] = [
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

export const searchableColumns: DataTableSearchableColumn<ITransaction>[] = [
  {
    id: "transactionCode",
    title: "transactionCode",
  },
];
