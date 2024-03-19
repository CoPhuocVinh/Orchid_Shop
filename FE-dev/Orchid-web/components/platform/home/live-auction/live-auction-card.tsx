"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import useCountdownTimer from "@/hooks/use-countdown-time";
import FancyText from "@carefully-coded/react-text-gradient";

// Make sure to import the useCountdownTimer hook

interface LiveAuctionsCardProps {
  productName: string;
  productCode: string;
  endDate: Date;
  id: number;
  image_url: string;
  title: string
}

export default function DestinationCard({
  image_url,
  id,
  productName,
  productCode,
  endDate,
  title
}: LiveAuctionsCardProps) {
  const countdown = useCountdownTimer(endDate.toString());

  return (
    <Link href={`/auction/${id}`}>
      <div className="group/item relative flex aspect-auto h-[340px] w-full flex-col overflow-hidden rounded-xl lg:h-[380px] 2xl:h-[420px] 4xl:h-[500px]">
        <Image
          src={image_url}
          alt="destination"
          fill
          sizes="(min-width: 320) 100vw, 100vw"
          className="relative z-0 rounded-xl bg-gray-lighter object-cover transition-all duration-500 group-hover/item:scale-110"
        />
        <div className="absolute bottom-0 z-10 h-1/4 w-full bg-gradient-to-t from-gray-dark/90 to-gray-dark/0 transition-all duration-500 group-hover/item:h-1/2 3xl:from-gray-dark/60"></div>
        <div className="relative z-10 mt-auto px-6 pb-6 md:px-7 md:pb-7 3xl:px-9 3xl:pb-9 4xl:px-12 4xl:pb-12">
          <div className="w-full mb-5   ">
            <div
              className=" items-center justify-center text-center text-transparent bg-clip-text h-28 w-full rounded-lg cursor-pointer transition-all 
              relative group   duration-200  bg-slate-400 text-gray-50"
            >
              <div className="absolute w-full text-white text-shadow-md font-sans font-bold text-xl opacity-75">
                <div className="absolute w-96  p-0 -bottom-40 -left-20 pb-10 duration-500 group-hover:-translate-y-2">
                  <div className="absolute -z-10  w-screen h-40 duration-500 opacity-50 bg-gray-500 "></div>
                  <span className="text-xl font-bold ml-28">{title}</span>
                </div>
              </div>
            </div>
          </div>
          <span className="flex items-center justify-center mt-5 space-x-2 ml-10 ">
            <span className=" text-white text-sm  ">Code:</span>
            <p className="  text-base mb-1 leading-7 text-white text-shadow-md font-sans font-bold opacity-75">
              {productCode}
            </p>
          </span>
        </div>
        {countdown && (
          <div className="absolute top-0 right-2 m-4 text-green-300 text-lg font-bold">
            <FancyText
              gradient={{ from: "#F858E0", to: "#77156C", type: "linear" }}
              animateTo={{ from: "#6DEDD0", to: "#7AE23A" }}
              animateDuration={1000}
            >
              <span className="inline-block w-6 text-center">{`${countdown.days
                .toString()
                .padStart(2, "0")}`}</span>
              d&nbsp; :&nbsp;
              <span className="inline-block w-6 text-center">{`${countdown.hours
                .toString()
                .padStart(2, "0")}`}</span>
              h&nbsp; :&nbsp;
              <span className="inline-block w-6 text-center">{`${countdown.minutes
                .toString()
                .padStart(2, "0")}`}</span>
              m&nbsp; :&nbsp;
              <span className="inline-block w-6 text-center">{`${countdown.seconds
                .toString()
                .padStart(2, "0")}`}</span>
              s
            </FancyText>
          </div>
        )}
      </div>
    </Link>
  );
}
