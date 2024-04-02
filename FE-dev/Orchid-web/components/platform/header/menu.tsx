"use client";

import { Button } from "@/components/ui/button";

import { useSession } from "next-auth/react";
import Link from "next/link";
import FormPopoverUser from "../popover-user-info";
import UserAvatar from "../user-avatar";
import { ShoppingBag, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
import { useModal } from "@/hooks/use-modal";
import { useRouter } from "next/navigation";

export default function Menu() {
  const { data: session } = useSession();

  const { onOpen } = useModal();

  const router = useRouter();
  const isAuthorized = session?.user.name;
  // const isCustomer = session?.user.role === "CUSTOMER";

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
      <ul className="hidden flex-wrap md:flex space-x-2">
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
      
          {/* <NotificationDropdown/> */}
      {isAuthorized && (
        <button onClick={() => onOpen("walletModal", {})}>
          <div className=" hover:bg-slate-300 rounded-lg px-4 py-2 md:flex items-center cursor-pointer group hidden">
            <div className="mr-2">
              <Wallet className="text-black hover:text-red-600 group-hover:text-red-600" />
            </div>
            <div className="font-semibold ">Ví tiền</div>
          </div>
        </button>
      )}
      {isAuthorized && (
        <button onClick={() => onOpen("orderSheetModal", {})}>
          <div className="hover:bg-slate-300 rounded-lg px-4 py-2 md:flex items-center cursor-pointer group hidden">
            <div className="mr-2">
              <ShoppingBag className="text-black group-hover:text-green-600" />
            </div>
            <div className="font-semibold ">Đơn hàng</div>
          </div>
        </button>
      )}

      <>
        {isAuthorized ? (
          <div className="ml-7 flex justify-end dark:text-black">
            <FormPopoverUser align="start" side="bottom" sideOffset={18}>
              <Button
                size="icon"
                className="rounded-full hidden justify-center md:block h-auto p-0 "
              >
                <UserAvatar />
              </Button>
            </FormPopoverUser>
          </div>
        ) : (
          <Button
            className="ml-5 hidden md:block rounded-lg px-6 py-2 text-sm capitalize md:text-base 4xl:px-8 4xl:py-2.5"
            variant="outline"
          >
            <Link href="/signin">Log in</Link>
          </Button>
        )}
      </>
    </nav>
  );
}
