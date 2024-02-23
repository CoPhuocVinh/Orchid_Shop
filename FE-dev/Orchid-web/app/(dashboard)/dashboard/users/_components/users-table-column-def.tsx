"use client";

import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/types/table";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  DotsHorizontalIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import { BsGenderMale,BsGenderFemale ,BsGenderTrans } from "react-icons/bs";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { IUser } from "@/types/dashboard";

export function fetchTasksTableColumnDefs(
  isPending: boolean,
  startTransition: React.TransitionStartFunction
): ColumnDef<IUser, unknown>[] {
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
        <DataTableColumnHeader column={column} title="UserID" />
      ),
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("name")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("email")}
            </span>
          </div>
        );
      },
    },

    {
      accessorKey: "gender",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Gender" />
      ),
      cell: ({ row }) => {
        const gender = row.original.gender;

        if (!gender) {
          return null;
        }

        return (
          <div className="flex items-center">
            {gender === "MALE" ? (
              <BsGenderMale
                className="mr-2 size-4 text-muted-foreground"
                aria-hidden="true"
              />
            ) : gender === "FEMALE" ? (
              <BsGenderFemale
                className="mr-2 size-4 text-muted-foreground"
                aria-hidden="true"
              />
            ) : (
              <BsGenderTrans 
                className="mr-2 size-4 text-muted-foreground"
                aria-hidden="true"
              />
            )}
            <span className="capitalize">{gender}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value instanceof Array && value.includes(row.getValue(id));
      },
    },
  ];
}

export const filterableColumns: DataTableFilterableColumn<IUser>[] = [
  {
    id: "gender",
    title: "gender",
    options: ["MALE", "FEMALE", "OTHER"].map((gender) => ({
      label: gender[0]?.toUpperCase() + gender.slice(1),
      value: gender,
    })),
  },
];

export const searchableColumns: DataTableSearchableColumn<IUser>[] = [
  {
    id: "email",
    title: "emails",
  },
];
