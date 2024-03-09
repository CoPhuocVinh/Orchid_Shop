"use client";

import Link from "next/link";
import Image from "next/image";

interface ListingCardProps {
  id: number;
  productName: string;
  productCode: string;
  startPrice: number;
  endPrice: number;
  status: string;
  depositPrice: number;
  quantity: number;
  modifiedBy: string;
  created_at: Date;
  updated_at: Date;
  remindAt: Date;
  idCss: string;
  image_url?: string;
}

export default function ListingCard({
  id,
  productName,
  productCode,
  startPrice,
  endPrice,
  status,
  depositPrice,
  quantity,
  modifiedBy,
  created_at,
  updated_at,
  remindAt,
  idCss,
  image_url,
}: ListingCardProps) {
  return (
    <>
      <div className="listing-card group/item relative inline-flex w-full flex-col">
        <div className="relative w-full overflow-hidden rounded-xl">
          <Link href={`/auction/${id}`}>
            <div className="listing-item after:absolute after:bottom-0 after:left-0 after:z-[1] after:h-1/4 after:w-full after:bg-gradient-to-t after:from-black/25">
              <Image
                className="aspect-[34/25] bg-gray-lighter transition-all duration-500 group-hover/item:scale-110"
                src={
                  image_url ? image_url : "/images/hoa-lan/hoa-lan-dep_1.jpg"
                }
                width={816}
                height={600}
                alt="auction"
                priority
              />
            </div>
          </Link>
        </div>
        <Link href={`/auction/${id}`}>
          <div className="content pt-3">
            <div className="mb-1 flex items-center gap-5">
              <span className="relative flex items-center font-bold text-gray-dark before:absolute before:-right-3 before:block before:h-1 before:w-1 before:rounded-full before:bg-gray-dark">
                {startPrice}
              </span>
              <span className="font-bold">{productName}</span>
            </div>
            <h4 className="text-ellipsis text-gray-dark 2xl:mb-1.5">
              {productCode}
            </h4>
            <p className="mb-3 text-gray-light xl:mb-3">{depositPrice}</p>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-gray-light">
                <span className="font-bold text-gray-dark xl:text-[18px] 3xl:text-xl">
                  {startPrice}
                </span>{" "}
                avg/day
              </p>
              <div className="flex items-center gap-3 leading-7">
                {/* <Rate
                  allowHalf
                  allowClear
                  defaultValue={rating}
                  characterClassName="h-[14px] w-[14px] 3xl:h-[18px] 3xl:w-[18px]"
                /> */}
                {/* ({ratingCount}) */}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
