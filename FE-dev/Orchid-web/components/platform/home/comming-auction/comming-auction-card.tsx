"use client";

import Link from "next/link";
import Image from "next/image";
import { startOfDay } from "date-fns";
import useCountdownTimer from "@/hooks/use-countdown-time";
import FancyText from "@carefully-coded/react-text-gradient";

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
  startDate?: Date;
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
  startDate,
}: ListingCardProps) {
  const countdown = useCountdownTimer(startDate?.toString());
  //console.log(countdown);
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
                Tên sản phẩm:
              </span>
              <span className="font-bold">{productName}</span>
            </div>
            <h4 className="text-ellipsis text-gray-dark 2xl:mb-1.5">
              Code : {productCode}
            </h4>
            <p className="mb-3 text-gray-light xl:mb-3">
              Giá khởi điểm: {startPrice}
            </p>
            {status === "COMING" && (
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <p className="text-gray-light">
                    <span className="font-bold text-gray-dark xl:text-[18px] 3xl:text-xl">
                      Bắt đầu sau :
                    </span>
                  </p>
                  {countdown && (
                    <div className="bottom-0 right-5 text-sm font-bold flex items-center gap-1">
                      <FancyText
                        gradient={{
                          from: "#fb4646",
                          to: "#ff7171",
                          type: "linear",
                        }}
                        animateTo={{ from: "#ed9a6d", to: "#e23a56" }}
                        animateDuration={10000}
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
            )}
          </div>
        </Link>
      </div>
    </>
  );
}
