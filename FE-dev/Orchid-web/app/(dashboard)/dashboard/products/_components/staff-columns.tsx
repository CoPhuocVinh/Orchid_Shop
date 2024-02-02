"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
export type User = {
  id: string;
  name: string;
  email: string;
  location: string;
  role: string;
  spent: number;
};

export const staffColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Staff Name",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "role",
    header: "Role"
  },
  {
    accessorKey: "spent",
    header: "Spent",
  },
];
