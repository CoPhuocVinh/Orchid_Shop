"use client";
import logo from "/public/static/images/logo/logo-color.svg";
import logoW from "/public/static/images/logo/logo-white.svg";
import profile from "/public/static/images/avatar/profile-52x52.png";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ResProfilePopup from "./res-profile-popup";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

interface HeaderTwoProps {
  handleSidebar: () => void;
}
const HeaderTwo = ({ handleSidebar }: HeaderTwoProps) => {
  const { data: session } = useSession();
  
  const [activePopup, handleActivePopup] = useState(false);

  
  return (
    <div>
      <header className="mobile-wrapper fixed z-20 block w-full md:hidden ">
        <div className="flex h-[80px] w-full items-center justify-between bg-white dark:bg-darkblack-600">
          <div className="flex h-full w-full items-center space-x-5">
            <button
              aria-label="none"
              type="button"
              className="drawer-btn rotate-180 transform"
              onClick={handleSidebar}
            >
              <span>
                <svg
                  width="16"
                  height="40"
                  viewBox="0 0 16 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 10C0 4.47715 4.47715 0 10 0H16V40H10C4.47715 40 0 35.5228 0 30V10Z"
                    fill="#F7F7F7"
                  />
                  <path
                    d="M10 15L6 20.0049L10 25.0098"
                    stroke="#A0AEC0"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
            <div>
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
          </div>
          <div className="mr-2">
            <div
              onClick={() => handleActivePopup(!activePopup)}
              className="flex cursor-pointer space-x-0 lg:space-x-3"
            >
              <div className="h-[52px] w-[52px] overflow-hidden rounded-xl border border-bgray-300">
                <Image
                  priority={true}
                  height={profile.height}
                  width={profile.width}
                  className="object-cover"
                  src={
                    session?.user.img
                      ? session.user.img
                      : "/images/avatar.jpg"
                  }
                  alt="avater"
                />
              </div>
              <div className="hidden 2xl:block">
                <div className="flex items-center space-x-2.5">
                  <h3 className="text-base font-bold leading-[28px] text-bgray-900">
                    {session?.user.name}
                  </h3>
                  <span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 10L12 14L17 10"
                        stroke="#28303F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                <p className="text-sm font-medium leading-[20px] text-bgray-600">
                  {session?.user.role}
                </p>
              </div>
            </div>

            <div className="profile-wrapper">
              <div
                onClick={() => handleActivePopup(!activePopup)}
                className="profile-outside fixed -left-[43px] top-0 hidden h-full w-full"
              ></div>
              <div
                style={{
                  filter: `drop-shadow(12px 12px 40px rgba(0, 0, 0, 0.08))`,
                }}
                className="profile-box absolute right-0 top-[81px] hidden w-[300px] overflow-hidden rounded-lg bg-white"
              >
                <div className="relative w-full px-3 py-2">
                  <div>
                    <ul>
                      <li className="w-full">
                        <Link href="/dashboard/settings">
                          <div className="flex items-center space-x-[18px] rounded-lg p-[14px] text-bgray-600 hover:bg-bgray-100 hover:text-bgray-900">
                            <div className="w-[20px]">
                              <span>
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12.1197 12.7805C12.0497 12.7705 11.9597 12.7705 11.8797 12.7805C10.1197 12.7205 8.71973 11.2805 8.71973 9.51047C8.71973 7.70047 10.1797 6.23047 11.9997 6.23047C13.8097 6.23047 15.2797 7.70047 15.2797 9.51047C15.2697 11.2805 13.8797 12.7205 12.1197 12.7805Z"
                                    stroke="#111827"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M18.7398 19.3796C16.9598 21.0096 14.5998 21.9996 11.9998 21.9996C9.39977 21.9996 7.03977 21.0096 5.25977 19.3796C5.35977 18.4396 5.95977 17.5196 7.02977 16.7996C9.76977 14.9796 14.2498 14.9796 16.9698 16.7996C18.0398 17.5196 18.6398 18.4396 18.7398 19.3796Z"
                                    stroke="#111827"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                    stroke="#111827"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </div>
                            <div className="flex-1">
                              <span className="text-sm font-semibold">
                                My Profile
                              </span>
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li className="w-full">
                        <Link href="/messages">
                          <div className="flex items-center space-x-[18px] rounded-lg p-[14px] text-bgray-600 hover:bg-bgray-100 hover:text-bgray-900">
                            <div className="w-[20px]">
                              <span>
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M2 12V7C2 4.79086 3.79086 3 6 3H18C20.2091 3 22 4.79086 22 7V17C22 19.2091 20.2091 21 18 21H8M6 8L9.7812 10.5208C11.1248 11.4165 12.8752 11.4165 14.2188 10.5208L18 8M2 15H8M2 18H8"
                                    stroke="#2A313C"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </span>
                            </div>
                            <div className="flex-1">
                              <span className="text-sm font-semibold">
                                Inbox
                              </span>
                            </div>
                          </div>
                        </Link>
                      </li>

                      <li className="w-full">
                        <div className="flex items-center space-x-[18px] rounded-lg p-[14px] text-success-300">
                          <div className="w-[20px]">
                            <span>
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15 10L13.7071 11.2929C13.3166 11.6834 13.3166 12.3166 13.7071 12.7071L15 14M14 12L22 12M6 20C3.79086 20 2 18.2091 2 16V8C2 5.79086 3.79086 4 6 4M6 20C8.20914 20 10 18.2091 10 16V8C10 5.79086 8.20914 4 6 4M6 20H14C16.2091 20 18 18.2091 18 16M6 4H14C16.2091 4 18 5.79086 18 8"
                                  stroke="#22C55E"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </span>
                          </div>
                          <div className="flex-1">
                            <span className="text-sm font-semibold">
                              <Button onClick={() => signOut()} className="">Log Out</Button>
                            </span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="my-[14px] h-[1px] w-full bg-bgray-300"></div>
                  <div>
                    <ul>
                      <li className="w-full">
                        <Link href="/settings">
                          <div className="rounded-lg p-[14px] text-bgray-600 hover:bg-bgray-100 hover:text-bgray-900">
                            <span className="text-sm font-semibold">
                              Settings
                            </span>
                          </div>
                        </Link>
                      </li>
                      <li className="w-full">
                        <Link href="/users">
                          <div className="rounded-lg p-[14px] text-bgray-600 hover:bg-bgray-100 hover:text-bgray-900">
                            <span className="text-sm font-semibold">Users</span>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <ResProfilePopup isActive={activePopup} />
    </div>
  );
};

export default HeaderTwo;
