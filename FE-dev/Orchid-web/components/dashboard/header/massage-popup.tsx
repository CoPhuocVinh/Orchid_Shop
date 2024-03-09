"use client";
import inbox1 from "/public/static/images/avatar/inbox-1.png";
import inbox2 from "/public/static/images/avatar/inbox-2.png";
import inbox3 from "/public/static/images/avatar/inbox-3.png";
import Link from "next/link";
import Image from "next/image";


import React from 'react'

interface MassagePopupProps{
    active: boolean,
    handlePopup: (title: string) => void
}

const MassagePopup= ({ active, handlePopup }: MassagePopupProps) => {
    return (
        <div className="message-popup-wrapper">
          <div
            onClick={() => handlePopup("massage")}
            id="mes-outside"
            className={`fixed -left-[43px] top-0  h-full w-full ${
              active ? "block" : "hidden"
            }`}
          ></div>
          <div
            id="message-box"
            style={{
              filter: `drop-shadow(12px 12px 40px rgba(0, 0, 0, 0.08))`,
              display: active ? "block" : "none",
            }}
            className="absolute -left-[276px] top-[81px] hidden w-[400px] rounded-lg bg-white dark:bg-darkblack-600"
          >
            <div className="relative w-full pb-[75px] pt-[66px]">
              <div className="absolute left-0 top-0 flex h-[66px] w-full items-center justify-between px-8">
                <h3 className="text-xl font-bold text-bgray-900 dark:text-white">
                  Message
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
                      d="M10.325 4.317C10.751 2.561 13.249 2.561 13.675 4.317C13.7389 4.5808 13.8642 4.82578 14.0407 5.032C14.2172 5.23822 14.4399 5.39985 14.6907 5.50375C14.9414 5.60764 15.2132 5.65085 15.4838 5.62987C15.7544 5.60889 16.0162 5.5243 16.248 5.383C17.791 4.443 19.558 6.209 18.618 7.753C18.4769 7.98466 18.3924 8.24634 18.3715 8.51677C18.3506 8.78721 18.3938 9.05877 18.4975 9.30938C18.6013 9.55999 18.7627 9.78258 18.9687 9.95905C19.1747 10.1355 19.4194 10.2609 19.683 10.325C21.439 10.751 21.439 13.249 19.683 13.675C19.4192 13.7389 19.1742 13.8642 18.968 14.0407C18.7618 14.2172 18.6001 14.4399 18.4963 14.6907C18.3924 14.9414 18.3491 15.2132 18.3701 15.4838C18.3911 15.7544 18.4757 16.0162 18.617 16.248C19.557 17.791 17.791 19.558 16.247 18.618C16.0153 18.4769 15.7537 18.3924 15.4832 18.3715C15.2128 18.3506 14.9412 18.3938 14.6906 18.4975C14.44 18.6013 14.2174 18.7627 14.0409 18.9687C13.8645 19.1747 13.7391 19.4194 13.675 19.683C13.249 21.439 10.751 21.439 10.325 19.683C10.2611 19.4192 10.1358 19.1742 9.95929 18.968C9.7828 18.7618 9.56011 18.6001 9.30935 18.4963C9.05859 18.3924 8.78683 18.3491 8.51621 18.3701C8.24559 18.3911 7.98375 18.4757 7.752 18.617C6.209 19.557 4.442 17.791 5.382 16.247C5.5231 16.0153 5.60755 15.7537 5.62848 15.4832C5.64942 15.2128 5.60624 14.9412 5.50247 14.6906C5.3987 14.44 5.23726 14.2174 5.03127 14.0409C4.82529 13.8645 4.58056 13.7391 4.317 13.675C2.561 13.249 2.561 10.751 4.317 10.325C4.5808 10.2611 4.82578 10.1358 5.032 9.95929C5.23822 9.7828 5.39985 9.56011 5.50375 9.30935C5.60764 9.05859 5.65085 8.78683 5.62987 8.51621C5.60889 8.24559 5.5243 7.98375 5.383 7.752C4.443 6.209 6.209 4.442 7.753 5.382C8.753 5.99 10.049 5.452 10.325 4.317Z"
                      stroke="#A0AEC0"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                      stroke="#A0AEC0"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
              <div>
                <div className="flex items-center border-b border-bgray-200 dark:border-darkblack-400">
                  <button
                    aria-label="none"
                    type="button"
                    className="flex space-x-2 border-b-2 border-success-300 px-6 py-4 text-sm font-semibold capitalize text-success-300"
                  >
                    <span>All</span>
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-success-50 text-[10px] text-success-300">
                      2
                    </span>
                  </button>
                </div>
                <ul className="scroll-style-1 h-[335px] w-full overflow-y-scroll">
                  <li className="border-b border-bgray-200 px-7 py-6 hover:bg-bgray-100 dark:border-darkblack-400 dark:hover:bg-darkblack-500">
                    <Link href="#">
                      <div className="flex space-x-3">
                        <div className="relative h-[48px] w-[48px] rounded-full">
                          <Image
                            priority={true}
                            height={inbox1.height}
                            width={inbox1.width}
                            src={inbox1.src}
                            alt="avatar"
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border border-white bg-bgray-300"></div>
                        </div>
                        <div className="flex-1">
                          <p className="mb-1 text-base font-bold text-bgray-900 dark:text-white">
                            James Eusobio
                          </p>
                          <p className="text-sm font-medium text-bgray-500 dark:text-bgray-50">
                            Hi, how are you? nedd help! .......
                          </p>
                          <span className="text-sm font-medium text-bgray-500 dark:text-bgray-50">
                            23 mins ago
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="border-b border-bgray-200 px-7 py-6 hover:bg-bgray-100 dark:border-darkblack-400 dark:hover:bg-darkblack-500">
                    <Link href="#">
                      <div className="flex space-x-3">
                        <div className="relative h-[48px] w-[48px] rounded-full">
                          <Image
                            priority={true}
                            height={inbox2.height}
                            width={inbox2.width}
                            src={inbox2.src}
                            alt="avatar"
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border border-white bg-success-300"></div>
                        </div>
                        <div className="flex-1">
                          <p className="mb-1 text-base font-bold text-bgray-900 dark:text-white">
                            Eusobio Joy
                          </p>
                          <p className="text-sm font-medium text-bgray-500">
                            Hi, how are you? nedd help! .......
                          </p>
                          <span className="text-sm font-medium text-bgray-500">
                            23 mins ago
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="border-b border-bgray-200 px-7 py-6 hover:bg-bgray-100 dark:border-darkblack-400 dark:hover:bg-darkblack-500">
                    <Link href="#">
                      <div className="flex space-x-3">
                        <div className="relative h-[48px] w-[48px] rounded-full">
                          <Image
                            priority={true}
                            height={inbox3.height}
                            width={inbox3.width}
                            src={inbox3.src}
                            alt="avatar"
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border border-white bg-success-300"></div>
                        </div>
                        <div className="flex-1">
                          <p className="mb-1 text-base font-bold text-bgray-900 dark:text-white">
                            James Camaron
                          </p>
                          <p className="text-sm font-medium text-bgray-500">
                            Hi, how are you? nedd help! .......
                          </p>
                          <span className="text-sm font-medium text-bgray-500">
                            23 mins ago
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="border-b border-bgray-200 px-7 py-6 hover:bg-bgray-100 dark:border-darkblack-400 dark:hover:bg-darkblack-500">
                    <Link href="#">
                      <div className="flex space-x-3">
                        <div className="relative h-[48px] w-[48px] rounded-full">
                          <Image
                            priority={true}
                            height={inbox1.height}
                            width={inbox1.width}
                            src={inbox1.src}
                            alt="avatar"
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border border-white bg-bgray-300"></div>
                        </div>
                        <div className="flex-1">
                          <p className="mb-1 text-base font-bold text-bgray-900 dark:text-white">
                            James Eusobio
                          </p>
                          <p className="text-sm font-medium text-bgray-500">
                            Hi, how are you? nedd help! .......
                          </p>
                          <span className="text-sm font-medium text-bgray-500">
                            23 mins ago
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="border-b border-bgray-200 px-7 py-6 hover:bg-bgray-100 dark:border-darkblack-400 dark:hover:bg-darkblack-500">
                    <Link href="#">
                      <div className="flex space-x-3">
                        <div className="relative h-[48px] w-[48px] rounded-full">
                          <Image
                            priority={true}
                            height={inbox2.height}
                            width={inbox2.width}
                            src={inbox2.src}
                            alt="avatar"
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border border-white bg-success-300"></div>
                        </div>
                        <div className="flex-1">
                          <p className="mb-1 text-base font-bold text-bgray-900 dark:text-white">
                            James Eusobio
                          </p>
                          <p className="text-sm font-medium text-bgray-500">
                            Hi, how are you? nedd help! .......
                          </p>
                          <span className="text-sm font-medium text-bgray-500">
                            23 mins ago
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="border-b border-bgray-200 px-7 py-6 hover:bg-bgray-100 dark:border-darkblack-400 dark:hover:bg-darkblack-500">
                    <Link href="#">
                      <div className="flex space-x-3">
                        <div className="relative h-[48px] w-[48px] rounded-full">
                          <Image
                            priority={true}
                            height={inbox3.height}
                            width={inbox3.width}
                            src={inbox3.src}
                            alt="avatar"
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border border-white bg-success-300"></div>
                        </div>
                        <div className="flex-1">
                          <p className="mb-1 text-base font-bold text-bgray-900 dark:text-white">
                            James Eusobio
                          </p>
                          <p className="text-sm font-medium text-bgray-500">
                            Hi, how are you? nedd help! .......
                          </p>
                          <span className="text-sm font-medium text-bgray-500">
                            23 mins ago
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="border-b border-bgray-200 px-7 py-6 hover:bg-bgray-100 dark:border-darkblack-400 dark:hover:bg-darkblack-500">
                    <Link href="#">
                      <div className="flex space-x-3">
                        <div className="relative h-[48px] w-[48px] rounded-full">
                          <Image
                            priority={true}
                            height={inbox1.height}
                            width={inbox1.width}
                            src={inbox1.src}
                            alt="avatar"
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border border-white bg-bgray-300"></div>
                        </div>
                        <div className="flex-1">
                          <p className="mb-1 text-base font-bold text-bgray-900 dark:text-white">
                            James Eusobio
                          </p>
                          <p className="text-sm font-medium text-bgray-500">
                            Hi, how are you? nedd help! .......
                          </p>
                          <span className="text-sm font-medium text-bgray-500">
                            23 mins ago
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
    
              <div className="absolute bottom-0 left-0 flex h-[75px] w-full items-center justify-between px-8">
                <div>
                  <Link href="#">
                    <div className="flex items-center space-x-2">
                      <span>
                        <svg
                          width="22"
                          height="12"
                          viewBox="0 0 22 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 6L11 11L21 1M1 6L6 11M11 6L16 1"
                            stroke="#0CAF60"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span className="text-sm font-semibold text-success-300">
                        Mark all as read
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default MassagePopup