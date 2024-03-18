'use client';

import { Swiper, SwiperSlide, Navigation } from '@/components/platform/slider-custom/slider';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import DestinationCard from './live-auction-card';
import ActionIcon from '../action-icon';
import { IAuction } from '@/types/dashboard';

interface LiveAuctionsProps {
  data: IAuction[]
}

export default function DestinationCarousel({ data }: LiveAuctionsProps) {
  return (
    <div className="group/section relative">
      <Swiper
        loop={false}
        modules={[Navigation]}
        autoplay={false}
        slidesPerView={4}
        spaceBetween={12}
        navigation={{
          nextEl: '.destination-button-next',
          prevEl: '.destination-button-prev',
        }}
        breakpoints={{
          0: {
            slidesPerView: 1.2,
          },
          480: {
            slidesPerView: 1.6,
          },
          580: {
            slidesPerView: 1.6,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          840: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        {data?.map((item: IAuction, index: number) => (
          <SwiperSlide key={`destinaion-${index}`}>
            <DestinationCard
              id={item.id}
              productName={item.productName}
              title={item.title}
              productCode={item.productCode}
              image_url={item.image_url}
              endDate={item.endDate!}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <ActionIcon
        rounded="full"
        color="invert"
        className="destination-button-prev invisible absolute left-[25px] top-1/2 z-10 flex -translate-y-1/2 shadow-md !transition-all group-hover/section:visible group-hover/section:left-0 lg:-translate-x-1/2 lg:-translate-y-1/2"
      >
        <ChevronLeftIcon className="h-auto w-5" />
      </ActionIcon>
      <ActionIcon
        rounded="full"
        color="invert"
        className="destination-button-next invisible absolute right-[25px] top-1/2 z-10 flex -translate-y-1/2 shadow-md !transition-all group-hover/section:visible group-hover/section:right-4 sm:group-hover/section:right-6 lg:group-hover/section:-right-[19px]"
      >
        <ChevronRightIcon className="h-auto w-5" />
      </ActionIcon>
    </div>
  );
}
