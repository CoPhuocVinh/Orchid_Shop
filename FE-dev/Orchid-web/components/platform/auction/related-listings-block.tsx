'use client';

import ListingCard from '../home/comming-auction/comming-auction-card';
import Section from '@/components/platform/section';
import SeeMore from '@/components/platform/see-more';
import { useGetAuctionsWithStatus } from '@/lib/react-query/queries';
import { AuctionStatus } from '@/types/dashboard';

export default function RelatedListingBlock() {
  const { data: liveAuction, isLoading: auctionLoading } = useGetAuctionsWithStatus(AuctionStatus.LIVE);

  return (
    <Section
      className="pt-5 xl:pt-7"
      headerClassName="items-end gap-5"
      title="Similar yachts you may like"
      titleClassName="text-xl md:!text-[22px] 2xl:!text-2xl"
      rightElement={<SeeMore className="hidden md:block" />}
    >
      <div className="grid grid-cols-1 gap-x-5 gap-y-8 pt-7 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:gap-y-10">
      {liveAuction?.data.slice(0, 8).map((item, index) => (
        <ListingCard
          key={`top-boat-grid-${index}`}
          id={item.id}
          idCss={`top-boat-grid-${index}`}
          productName= {item.productName}
          productCode= {item.productCode}
          startPrice= {item.startPrice}
          endPrice= {item.endPrice}
          status= {item.status}
          depositPrice= {item.depositPrice}
          quantity= {item.quantity}
          modifiedBy= {item.modifiedBy}
          created_at= {item.created_at}
          updated_at= {item.updated_at}
          remindAt= {item.remindAt}
          image_url={item.image_url}
        />
        ))}
      </div>
    </Section>
  );
}
