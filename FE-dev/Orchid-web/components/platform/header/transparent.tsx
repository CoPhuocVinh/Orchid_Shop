"use client";

import { useEffect, useRef, useState } from "react";
import { addScrollingClass } from "@/utils/add-scrolling-class";
import Menu from "./menu";
import Link from "next/link";
import FormPopoverUser from "../popover-user-info";
import { Button } from "@/components/ui/button";
import UserAvatar from "../user-avatar";
import { useSession } from "next-auth/react";
import Image from "next/image";

import { ServerSearch } from "./search-header";
import { Hash } from "lucide-react";
import { IAuction } from "@/types/dashboard";
import { useSearchParams } from "next/navigation";

export default function TransparentHeader() {
  const headerRef = useRef(null);
  addScrollingClass(headerRef);
  const { data: session } = useSession();

  const [searchQuery, setSearchQuery] = useState("");
  const [auctions, setAuctions] = useState<IAuction[]>([]);
  // const searchParams = useSearchParams();
  // const searchQuery = searchParams.get("q") || "";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://orchid.fams.io.vn/api/v1/auctions/list?search=${searchQuery}`
        );
        const data = await response.json();
        setAuctions(data.payload.content);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };

    fetchData();
  }, [searchQuery]);

  const iconMap = {
    ["TITLE"]: <Hash className="w-4 h-4 mr-2" />,
  };

  const isAuthorized = session?.user;
  return (
    <header
      ref={headerRef}
      className="transparent-header fixed left-0 top-0 z-40 flex w-full justify-between bg-white px-4 py-3.5 sm:bg-transparent sm:px-6 lg:py-6 2xl:px-7 3xl:px-8 4xl:px-16 4xl:py-9"
    >
      <div className="flex items-center">
        <Link href="/">
          <Image alt="logo" src="/images/logo.svg" width={20} height={20} />
        </Link>
        <span className="text-lg ml-2 font-bold">Orchid</span>
      </div>
      <div className="hidden md:flex md:w-[400px] overflow-x-auto ">
        <ServerSearch
          //  onSearch={handleSearch}
          data={[
            {
              label: "Title",
              type: "title",
              data: auctions?.map((auction) => ({
                id: auction.id.toString(),
                name: auction.title,
                icon: iconMap["TITLE"],
              })),
            },
            // {
            //   label: "Audio Channels",
            //   type: "type",
            //   data: AuctionSearchType?.map((channel) => ({
            //     id: channel.id,
            //     name: channel.name,
            //     icon: iconMap["TYPE"],
            //   })),
            // },
          ]}
        />
      </div>
      <div className="flex items-center">
        <div className="md:hidden">
          {isAuthorized ? (
            <div className="ml-7 flex justify-end dark:text-black">
              <FormPopoverUser align="start" side="bottom" sideOffset={18}>
                <Button
                  size="icon"
                  className="rounded-full flex justify-center md:block h-auto p-0"
                >
                  <UserAvatar />
                </Button>
              </FormPopoverUser>
            </div>
          ) : (
            <Button
              className="ml-5 rounded-lg px-6 py-2 text-sm capitalize md:text-base 4xl:px-8 4xl:py-2.5"
              variant="outline"
            >
              <Link href="/signin">Log in</Link>
            </Button>
          )}
        </div>
        {/* <div>serch</div> */}
        <Menu />
      </div>
    </header>
  );
}
