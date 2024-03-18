"use client";

import Image from "next/image";

export default function ReviewCard({
  avatar,
  name,
  date,
  location,
  review,
}: any) {
  return (
    <div className="border-b-[1px] border-gray-200 py-6   md:py-7">
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="relative h-12 w-12 overflow-hidden rounded-full md:h-16 md:w-16">
            <Image
              src={avatar}
              alt="icon"
              fill
              sizes="(min-width: 320) 100vw, 100vw"
              className="aspect-[1/1] rounded-full object-cover"
            />
          </div>
          <div className="ml-3 md:ml-5">
            <h6 className="uppercase leading-[22px]">{name}</h6>
            <p className="mt-0.5 text-sm leading-[22px] text-gray-dark md:mt-2 md:text-secondary">
              {date}
            </p>
          </div>
        </div>

        <p className="mt-1 text-sm leading-5 text-gray-dark md:mt-2">
          {location}
        </p>
      </div>
      <div className="mt-5">
        <p className="font-medium leading-7 tracking-wide text-secondary">
          {review}
        </p>
      </div>
    </div>
  );
}
