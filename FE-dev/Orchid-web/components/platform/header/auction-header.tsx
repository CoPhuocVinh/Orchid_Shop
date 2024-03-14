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
import FormPopover from "@/components/form/form-popover";
import { Wallet } from "lucide-react";

import { useGetWallet } from "@/lib/react-query/queries";
import { WalletSkeleton } from "@/components/loader/wallet_loader";
import Image from "next/image";
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
  // const isCustomer = session?.user.role === "CUSTOMER";

  const { data: wallet, isLoading: walletLoading } = useGetWallet(
    session?.user.id!
  );

  const headerRef = useRef(null);
  addScrollingClass(headerRef);
  if (walletLoading) return <WalletSkeleton />;

  return (
    <header
      ref={headerRef}
      className="dashboard-header sticky top-0 z-30 flex h-16 w-full bg-white md:flex md:items-center lg:h-[72px] 2xl:h-20 4xl:h-24"
    >
      <div className="container-fluid grid w-full grid-cols-2 items-center gap-0 lg:grid-cols-3 3xl:!px-12">
        <div className="flex items-center gap-2 md:gap-4 2xl:gap-5">
          <Link
            href="/"
            className="flex items-center font-bold dark:text-blue-200  "
          >
            <Image
              alt="logo"
              src="/images/logo.svg"
              height={30}
              width={30}
              priority={true}
              className=""
            />
            <span className="text-2xl ml-2 font-bold">Orchid</span>
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
            {isAuthorized  && (
              <FormPopover align="start" side="bottom" sideOffset={18}>
                <div className="rounded-lg px-4 py-2 flex items-center cursor-pointer">
                  <div className="mr-2">
                    <Wallet />
                  </div>
                  {/* <div className="font-semibold">
                    {wallet?.data?.balance} VNĐ
                  </div> */}
                </div>
              </FormPopover>
            )}
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
