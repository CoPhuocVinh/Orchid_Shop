import Link from "next/link";
import React from "react";

interface ResProfilePopupProps {
  isActive: boolean;
}
const ResProfilePopup = ({ isActive }: ResProfilePopupProps) => {
  return (
    <div
      style={{
        filter: `drop-shadow(12px 12px 40px rgba(0, 0, 0, 0.08))`,
        zIndex: 999,
      }}
      className={`profile-box absolute right-0 top-[81px]  w-[300px] overflow-hidden rounded-lg bg-white ${
        isActive ? "block" : "hidden"
      }`}
    >
      <div className="relative w-full px-3 py-2">
        <div>
          <ul>
            <li className="w-full">
              <Link href="/settings">
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
                    <span className="text-sm font-semibold">My Profile</span>
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
                    <span className="text-sm font-semibold">Inbox</span>
                  </div>
                </div>
              </Link>
            </li>
            <li className="w-full">
              <Link href="#">
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
                    <span className="text-sm font-semibold">Log Out</span>
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="my-[14px] h-[1px] w-full bg-bgray-300"></div>
        <div>
          <ul>
            <li className="w-full">
              <Link href="/settings">
                <div className="rounded-lg p-[14px] text-bgray-600 hover:bg-bgray-100 hover:text-bgray-900">
                  <span className="text-sm font-semibold">Settings</span>
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
  );
};

export default ResProfilePopup;
