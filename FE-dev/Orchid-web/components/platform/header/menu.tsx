"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
// import useAuth from '@/hooks/use-auth';
// import { Routes } from '@/config/routes';
// import ProfileMenu from '@/components/header/profile-menu';
// import { useModal } from '@/components/modals/context';
// import { useIsMounted } from '@/hooks/use-is-mounted';
// import Button from '@/components/ui/button';

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
  {
    id: 4,
    label: "View dashboard admin ",
    path: "/dashboard",
  },
  // {
  //   id: 4,
  //   label: "Help",
  //   path: "help",
  // },
];

export default function Menu() {
  //   const { openModal } = useModal();
  //   const { isAuthorized } = useAuth();
  //   const mounted = useIsMounted();

  const isAuthorized = false

  return (
    <nav className="primary-nav hidden items-center justify-between md:flex">
      <ul className="hidden flex-wrap md:flex">
        {menuItems.map((item) => (
          <li key={item.id}>
            <Link href={item.path} className="px-5 capitalize text-white">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
        <>
          {isAuthorized ? (
            <div className="ml-7 flex justify-end dark:text-black">
              {/* <ProfileMenu className="hidden md:block" /> */}
              Profile
            </div>
          ) : (
            <Button
              className="ml-5 rounded-lg px-6 py-2 text-sm capitalize md:text-base 4xl:px-8 4xl:py-2.5"
              variant="outline"
            >
              Log in
            </Button>
          )}
        </>
    </nav>
  );
}
