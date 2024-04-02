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
import FormPopover from "@/components/forms/form-popover";
import { ShoppingBag, Wallet } from "lucide-react";

import { useGetWallet } from "@/lib/react-query/queries";
import { WalletSkeleton } from "@/components/loader/wallet-loader";
import Image from "next/image";
import { useModal } from "@/hooks/use-modal";
import { useRouter } from "next/navigation";

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
  const { onOpen } = useModal();

  const router = useRouter();


  const headerRef = useRef(null);
  addScrollingClass(headerRef);
  // if (walletLoading) return <WalletSkeleton />;

  return (
    <header
      ref={headerRef}
      className="dashboard-header sticky top-0 z-30 flex h-16 w-full bg-white md:flex md:items-center lg:h-[72px] 2xl:h-20 4xl:h-24"
    >
      <div className="container-fluid w-full flex justify-between items-center gap-0 lg:grid-cols-3 3xl:!px-12 space-x-4">
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

        <div className="flex items-center md:justify-end space-x-2">
          <SearchIconBtn className="hidden" />
          {/* {mounted ? ( */}
          <ul className="hidden md:flex justify-center  space-x-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => router.push(`${item.path}`)}
                className="px-5 py-2 hover:bg-slate-300 rounded-lg capitalize text-black font-bold "
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
          <>
            {isAuthorized && (
              <button onClick={() => onOpen("walletModal", {})}>
                <div className=" hover:bg-slate-300 rounded-lg px-4 py-2 flex items-center cursor-pointer group">
                  <div className="mr-2">
                    <Wallet className="text-black hover:text-red-600 group-hover:text-red-600" />
                  </div>
                  <div className="font-semibold hidden md:block ">Ví tiền</div>
                </div>
              </button>
            )}
            {isAuthorized && (
              <button onClick={() => onOpen("orderSheetModal", {})}>
                <div className="hover:bg-slate-300 rounded-lg px-4 py-2 flex items-center cursor-pointer group">
                  <div className="mr-2">
                    <ShoppingBag className="text-black group-hover:text-green-600" />
                  </div>
                  <div className="font-semibold hidden md:block ">Đơn hàng</div>
                </div>
              </button>
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
