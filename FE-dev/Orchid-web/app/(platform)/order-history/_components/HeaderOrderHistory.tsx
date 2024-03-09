import React from "react";

import Link from "next/link";
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
];
function HeaderOrderHistory() {
  const isAuthorized = false;
  return (
    <header className="dashboard-header sticky top-0 z-30 flex h-16 w-full bg-white md:flex md:items-center lg:h-[72px] 2xl:h-20 4xl:h-24">
      <div className="container-fluid grid w-full grid-cols-2 items-center gap-0 lg:grid-cols-3 3xl:!px-12">
        <div className="flex items-center gap-2 md:gap-4 2xl:gap-5">
          {/* <SideNavButton className="!block" />
          <Logo className="!text-gray-dark" /> */}

          <Link href="/" className="!text-gray-dark">
            LOGO
          </Link>
        </div>

        <ul className="flex justify-between flex-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link href={item.path} className="px-5 text-black flex flex-row">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default HeaderOrderHistory;
