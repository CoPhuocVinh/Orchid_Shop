"use client";

import { Button } from "@/components/ui/button";

import { useSession } from "next-auth/react";
import Link from "next/link";
import FormPopoverUser from "../popover-user-info";
import UserAvatar from "../user-avatar";
import { Plus, Wallet } from "lucide-react";
import FormPopover from "@/components/form/form-popover";
import { useGetWallet } from "@/lib/react-query/queries";

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
    label: "order",
    path: "/order",
  },
];
import { WalletSkeleton } from "@/components/loader/wallet_loader";

export default function Menu() {
  const { data: session } = useSession();

  const isAuthorized = session?.user;
  // const isCustomer = session?.user.role === "CUSTOMER";

  const { data: wallet, isLoading: walletLoading } = useGetWallet(
    session?.user.id!
  );

  if (walletLoading) return <WalletSkeleton />;

  return (
    <nav className="primary-nav hidden items-center justify-between md:flex">
      <ul className="hidden flex-wrap md:flex">
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

      {isAuthorized && (
        <FormPopover align="start" side="bottom" sideOffset={18}>
          <div className="bg-gray-200 rounded-lg px-4 py-2 flex items-center cursor-pointer">
            <div className="mr-2">
              <Wallet className="text-red-500" />
            </div>
            <div className="font-semibold">{wallet?.data?.balance} VNĐ</div>
          </div>
        </FormPopover>
      )}

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
    </nav>
  );
}
