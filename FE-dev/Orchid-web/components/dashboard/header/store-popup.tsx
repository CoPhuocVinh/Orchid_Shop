"use client";
import Image from "next/image";
import React from "react";
import member from "/public/static/images/avatar/members.png";

interface StorePopUpProps {
  active: boolean;
  handlePopup: (title: string) => void;
}
const StorePopUp = ({ active, handlePopup }: StorePopUpProps) => {
  return (
    <div className="store-wrapper">
      <div
        id="store-outside"
        onClick={() => handlePopup("store")}
        className={`fixed -left-[43px] top-0  h-full w-full ${
          active ? "block" : "hidden"
        }`}
      ></div>
      <div
        id="store-box"
        style={{
          filter: `drop-shadow(12px 12px 40px rgba(0, 0, 0, 0.08))`,
          display: active ? "block" : "none",
        }}
        className="absolute -left-[134px] top-[81px] hidden w-[330px] overflow-hidden rounded-lg bg-white dark:bg-darkblack-600"
      >
        <div className="relative w-full p-6">
          <div className="bonus-box-wrapper w-full overflow-hidden pb-[33px]">
            <div className="bonus-box relative flex w-full justify-center">
              <div
                style={{ width: `calc(100% - 20px)` }}
                className="absolute left-[10px] top-[5px] h-[200px] rounded-lg bg-success-200"
              ></div>
              <div className="relative w-full rounded-lg bg-success-300 p-5">
                <h3 className="text-center text-[28px] font-bold text-white">
                  60% Bonus
                </h3>
                <p className="mb-3 px-5 text-center text-lg font-semibold leading-[24px] text-success-100">
                  Create an Account and Get Bonus
                </p>
                <div className="flex justify-center">
                  <a href="#">
                    <div className="flex h-[56px] w-[166px] items-center justify-center rounded-lg bg-warning-300 transition duration-300 ease-in-out hover:bg-warning-200">
                      <span className="text-sm font-bold text-bgray-900">
                        Discover More
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="progess-bar mb-[13px] flex justify-center">
            <div className="bonus-per relative">
              <div className="bonus-outer">
                <div className="bonus-inner">
                  <div className="number">
                    <span className="text-sm font-medium text-bgray-900">
                      25%
                    </span>
                  </div>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80px"
                height="80px"
              >
                <circle
                  style={{
                    strokeDashoffset: `calc(215 - 215 * (25 / 100))`,
                  }}
                  cx="40"
                  cy="40"
                  r="35"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <p className="mb-2.5 text-center text-sm font-semibold text-success-300">
            Discover more
          </p>
          <div className="flex justify-center">
            <Image
              priority={true}
              height={member.height}
              width={member.width}
              src={member.src}
              alt="members"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePopUp;
