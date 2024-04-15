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

export default function TransparentHeader() {
  const headerRef = useRef(null);
  addScrollingClass(headerRef);
  const { data: session } = useSession();

  const isAuthorized = session?.user;
  return (
    <header
      ref={headerRef}
      className="transparent-header fixed left-0 top-0 z-40 flex w-full justify-between bg-white pr-0 pl-4 md:px-4 py-3.5 sm:bg-transparent sm:px-6 lg:py-6 2xl:px-7 3xl:px-8 4xl:px-16 4xl:py-9"
    >
      <div className="flex items-center">
        <Link href="/">
          <Image alt="logo" src="/images/logo.svg" width={20} height={20} />
        </Link>
        <span className="text-lg ml-2 font-bold">Orchid</span>
      </div>
      <div className="hidden md:flex md:w-[400px] overflow-x-auto ">
        {/* <ServerSearch /> */}
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
