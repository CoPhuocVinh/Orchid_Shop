"use client";
import { useState } from "react";

import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import SidebarV2 from "@/components/dashboard/sidebar/SidebarV2";
import Overlay from "@/components/dashboard/overlay/page";
import HeaderTwo from "@/components/dashboard/header/header-two";
import HeaderOne from "@/components/dashboard/header/header-one";

export default function DashboardLayout({
  children,
  bg,
  overlay,
}: {
  children: React.ReactNode;
  bg: string,
  overlay: React.ReactNode
}) {
  const [sidebar, setSidebar] = useState(true);

  return (
    <div className={`layout-wrapper ${sidebar && "active"}  w-full h-full`}>
      <div className="relative flex w-full">
        <Sidebar handleActive={() => setSidebar(!sidebar)} />
        {overlay ? overlay : <Overlay />}
        <SidebarV2 />
        <div
          className={`body-wrapper flex-1 overflow-x-hidden ${
            bg ? bg : "dark:bg-darkblack-500"
          } `}
        >
          <HeaderOne handleSidebar={() => setSidebar(!sidebar)} />
          <HeaderTwo handleSidebar={() => setSidebar(!sidebar)} />
          {children}
        </div>
      </div>
    </div>
  );
}
