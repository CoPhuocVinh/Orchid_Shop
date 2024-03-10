"use client";

import { useRef } from "react";
// import useAuth from '@/hooks/use-auth';
import { addScrollingClass } from "@/utils/add-scrolling-class";
import { Button } from "@/components/ui/button";
import SearchIconBtn from "./search-icon-btn";
import Searchbox from "./search-box";
import Link from "next/link";
import { useSession } from "next-auth/react";
import FormPopoverUser from "../popover-user-info";
import UserAvatar from "../user-avatar";
// import SearchIconBtn from '@/components/ui/search-icon-btn';
// import SideNavButton from '@/components/ui/side-nav-button';
// import ProfileMenu from '@/components/header/profile-menu';
// import { useModal } from '@/components/modals/context';
// import Searchbox from '@/components/ui/search-box';
// import Button from '@/components/ui/button';
// import Logo from '@/components/ui/logo';
// import { useIsMounted } from '@/hooks/use-is-mounted';
const menuItems = [
  {
    id: 1,
    label: "Home",
    path: "/",
  },
  {
    id: 2,
    label: "Auction",
    path: "/auction",
  },
  {
    id: 3,
    label: "profile",
    path: "/profile",
  },
];
export default function AuctionHeader() {
  //   const mounted = useIsMounted();
  //   const { openModal } = useModal();
  //   const { isAuthorized } = useAuth();
  const { data: session } = useSession();

  const isAuthorized = session?.user;

  const headerRef = useRef(null);
  addScrollingClass(headerRef);

  return (
    <header
      ref={headerRef}
      className="dashboard-header sticky top-0 z-30 flex h-16 w-full bg-white md:flex md:items-center lg:h-[72px] 2xl:h-20 4xl:h-24"
    >
      <div className="container-fluid grid w-full grid-cols-2 items-center gap-0 lg:grid-cols-3 3xl:!px-12">
        <div className="flex items-center gap-2 md:gap-4 2xl:gap-5">
          {/* <SideNavButton className="!block" />
          <Logo className="!text-gray-dark" /> */}

          <Link href="/" className="!text-gray-dark">
            LOGO
          </Link>
        </div>
        <ul className="hidden flex-wrap md:flex w-full max-w-sm xl:max-w-[600px] justify-center">
        {menuItems.map((item) => (
          <li key={item.id}>
            <Link
              href={item.path}
              className="px-5 capitalize text-black font-bold"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
        <div className="flex items-center justify-end gap-5">
          <SearchIconBtn className="hidden" />
          {/* {mounted ? ( */}
          <>
            {isAuthorized ? (
              <div className="ml-7 flex justify-end dark:text-black">
                {/* <ProfileMenu className="hidden md:block" /> */}
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
          </>
          {/* ) : null} */}
        </div>
      </div>
    </header>
  );
}
