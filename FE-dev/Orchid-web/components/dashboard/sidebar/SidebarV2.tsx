"use client";

import Link from "next/link";
import logo from "/public/static/images/logo/logo-short.svg";
import logoW from "/public/static/images/logo/logo-short-white.svg";
import Image from "next/image";
import { Icons } from "@/components/icons";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

function SidebarV2() {
  return (
    <aside className="relative hidden w-[96px] bg-white dark:bg-black sm:block">
      <div className="sidebar-wrapper-collapse relative top-0 z-30 w-full">
        <div className="sidebar-header sticky top-0 z-20 flex h-[108px] w-full items-center justify-center border-b border-r border-b-[#F7F7F7] border-r-[#F7F7F7] bg-white dark:border-darkblack-500 dark:bg-darkblack-600">
          <Link href="/">
            <Image
              priority={true}
              height={logo.height}
              width={logo.width}
              src={logo.src}
              className="block dark:hidden"
              alt="logo"
            />
            <Image
              priority={true}
              height={logoW.height}
              width={logoW.width}
              src={logoW.src}
              className="hidden dark:block"
              alt="logo"
            />
          </Link>
        </div>
        <div className="sidebar-body w-full pt-[14px]">
          <div className="flex flex-col items-center">
            <div className="nav-wrapper mb-[36px]">
              <div className="item-wrapper mb-5">
                <ul className="mt-2.5 flex flex-col items-center justify-center">
                  <li className="item px-[43px] py-[11px]">
                    <Link href="/dashboard">
                      <span className="item-ico">
                        <Icons.dashboarSidebarIcon />
                      </span>
                    </Link>
                  </li>
                  <li className="item px-[43px] py-[11px]">
                    <Link href="/dashboard/transaction">
                      <span className="item-ico">
                        <Icons.transactionSidebarIcon />
                      </span>
                    </Link>
                  </li>
                  <li className="item px-[43px] py-[11px]">
                    <Link href="/dashboard/statistics">
                      <span className="item-ico">
                        <Icons.statisticSidebarIcon />
                      </span>
                    </Link>
                  </li>
                  <li className="item px-[43px] py-[11px]">
                    <Link href="/dashboard/my-wallet">
                      <span className="item-ico">
                        <Icons.myWalletSidebarIcon />
                      </span>
                    </Link>
                  </li>
                  <li className="item px-[43px] py-[11px]">
                    <Link href="/dashboard/users">
                      <span className="item-ico">
                        <Icons.userSidebarIcon />
                      </span>
                    </Link>
                    <ul className="sub-menu min-w-[200px] rounded-lg border-l border-success-100 bg-white px-5 py-2 shadow-lg">
                      <li>
                        <Link
                          href="/dashboard/users"
                          className="text-md inline-block py-1.5 font-medium text-bgray-600 hover:text-bgray-800"
                        >
                          View Info user
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/dashboard/create-staff"
                          className="text-md inline-block py-1.5 font-medium text-bgray-600 hover:text-bgray-800"
                        >
                          Create
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="item px-[43px] py-[11px]">
                    <Link href="/dashboard/products">
                      <span className="item-ico">
                        <Icons.productSidebarIcon />
                      </span>
                    </Link>
                    <ul className="sub-menu min-w-[200px] rounded-lg border-l border-success-100 bg-white px-5 py-2 shadow-lg">
                      <li>
                        <Link
                          href="/dashboard/products"
                          className="text-md inline-block py-1.5 font-medium text-bgray-600 hover:text-bgray-800"
                        >
                          View products
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/dashboard/products/create-product"
                          className="text-md inline-block py-1.5 font-medium text-bgray-600 hover:text-bgray-800"
                        >
                          Create product
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="item px-[43px] py-[11px]">
                    <Link href="/dashboard/auctions">
                      <span className="item-ico">
                        <Icons.auctionDashboardIcon />
                      </span>
                    </Link>
                    <ul className="sub-menu min-w-[200px] rounded-lg border-l border-success-100 bg-white px-5 py-2 shadow-lg">
                      <li>
                        <Link
                          href="/dashboard/auctions"
                          className="text-md inline-block py-1.5 font-medium text-bgray-600 hover:text-bgray-800"
                        >
                          View auctions
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/dashboard/auctions/create-auctions"
                          className="text-md inline-block py-1.5 font-medium text-bgray-600 hover:text-bgray-800"
                        >
                          Create auction
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="item-wrapper mb-5">
                <ul className="mt-2.5 flex flex-col items-center justify-center">
                  <li className="item px-[43px] py-[11px]">
                    <Link href="/dashboard/setting">
                      <span className="item-ico">
                        <Icons.helpSidebarIcon />
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="item-wrapper mb-5">
                <ul className="mt-2.5 flex flex-col items-center justify-center">
                  <li className="item px-[43px] py-[11px]">
                    <Button
                      onClick={() => signOut()}
                      className="bg-white dark:bg-black"
                    >
                      <span className="item-ico">
                        <Icons.logoutSidebardIcon />
                      </span>
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default SidebarV2;
