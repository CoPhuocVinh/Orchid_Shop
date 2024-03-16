"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import useCountdownTimer from "@/hooks/use-countdown-time";
// Make sure to import the useCountdownTimer hook

interface LiveAuctionsCardProps {
  productName: string;
  productCode: string;
  endDate: Date;
  id: number;
  image_url: string;
}

export default function DestinationCard({
  image_url,
  id,
  productName,
  productCode,
  endDate,
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
          <h3 className="text-xl font-bold leading-7 text-lime-400 3xl:text-2xl">
            {productName}
          </h3>
          <p className="text-sm font-normal leading-7 text-lime-400 lg:text-base 3xl:pt-1.5 4xl:text-lg">
            {productCode}
          </p>
        </div>
        {countdown && (
          <div className="absolute top-0 right-2 m-4 text-green-300 text-lg font-bold">
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
          </div>
        )}
      </div>
    </Link>
  );
}
