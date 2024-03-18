"use client";

import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";

interface ServerSearchProps {
  data: {
    label: string;
    type: "title" | "type";
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}

export const ServerSearch: React.FC<ServerSearchProps> = ({ data }) => {
  // console.log(data);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);

    return () => removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-x-1 px-2 py-2
                     w-full bg-gray-200 rounded-md border border-gray-300 hover:bg-gray-100 transition group "
      >
        <Search className="h-4 w-4 text-gray-500 group-hover:text-gray-400" />
        <p className="text-sm text-gray-500 group-hover:text-gray-400 transition">
          Search
        </p>
        <kbd className="ml-auto pointer-events-none inline-flex items-center gap-1 bg-gray-100 rounded border font-mono px-1.5 text-gray-500 group-hover:text-gray-400">
          <span className="text-xs">&#8984;</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        {/* <CommandInput placeholder="Type a command or search..." /> */}
        <CommandInput placeholder="KAO ĐANG TO DO cái này nhé ....." />

        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {data.map(({ data, label, type }) => {
            if (!data?.length) return null;

            return (
              <CommandGroup key={label} heading={label}>
                {data.map(({ id, name, icon }) => {
                  return (
                    <CommandItem key={id} >
                      {icon}
                      <span>{name}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
};
