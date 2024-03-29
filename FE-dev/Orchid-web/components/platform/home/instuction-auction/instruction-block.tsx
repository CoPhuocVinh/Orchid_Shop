"use client";

import { useTimeout } from "@/hooks/use-timeout";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import BlockLoader from "@/components/loader/block-loader";
import {
  Swiper,
  SwiperSlide,
  Navigation,
} from "@/components/platform/slider-custom/slider";
import Section from "@/components/platform/section";
import { instructions } from "@/data/user-working-data/instructions";
import ActionIcon from "../action-icon";
import InstructionCard from "./instruction-auction-card";

function InstructionGrid() {
  return (
    <>
      <div className="hidden grid-cols-1 gap-5 md:grid-cols-2 xl:grid xl:grid-cols-4">
        {instructions?.map((item, index) => (
          <InstructionCard
            key={`instruction-${index}`}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
      <div className="instruction group relative xl:hidden">
        <Swiper
          modules={[Navigation]}
          autoplay={true}
          slidesPerView={4}
          spaceBetween={12}
          navigation={{
            nextEl: ".instruction-button-next",
            prevEl: ".instruction-button-prev",
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
          {instructions?.map((item, index) => (
            <SwiperSlide key={`instruction-${index}`}>
              <InstructionCard
                key={`instruction-${index}`}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <ActionIcon
          rounded="full"
          color="invert"
          className="instruction-button-prev invisible absolute left-[25px] top-1/2 z-10 flex -translate-y-1/2 shadow-md !transition-all group-hover/section:visible group-hover/section:left-0"
        >
          <ChevronLeftIcon className="h-auto w-5" />
        </ActionIcon>
        <ActionIcon
          rounded="full"
          color="invert"
          className="instruction-button-next invisible absolute right-[25px] top-1/2 z-10 flex -translate-y-1/2 shadow-md !transition-all group-hover/section:visible group-hover/section:right-4 sm:group-hover/section:right-6 lg:group-hover/section:-right-[19px]"
        >
          <ChevronRightIcon className="h-auto w-5" />
        </ActionIcon>
      </div>
    </>
  );
}

export default function InstructionBlock() {
  const { state } = useTimeout();

  return (
    <Section
      className="group/section instruction-section lg:container-fluid mt-12 pl-4 sm:pl-6 lg:mt-16"
      title="Cách tham gia đấu giá hoa lan"
      description="Không thể mãn nguyện, nó được xem xét là một lời mời khi đi du lịch vô cảm."
      headerClassName="mb-4 md:mb-5 xl:mb-6"
    >
      {!state && <BlockLoader />}
      {state && <InstructionGrid />}
    </Section>
  );
}
