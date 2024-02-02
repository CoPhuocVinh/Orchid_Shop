'use client';

import { useTimeout } from '@/hooks/use-timeout';
import {topBoats} from '@/data/user-working-data/top-boats'
import Section from '@/components/platform/section';
import SeeMore from '@/components/platform/see-more';
import ListingCardLoader from '@/components/loader/listing-card-loader';
import ListingCard from './live-auction-card';

function AuctionGrid() {
  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:gap-y-10">
      {topBoats.slice(0, 8).map((item, index) => (
        <ListingCard
          key={`top-boat-grid-${index}`}
          id={`top-boat-grid-${index}`}
          slides={item.thumbnail}
          time={item.time}
          caption={item.caption}
          title={item.title}
          slug={item.slug}
          location={item.location}
          price={item.price}
          ratingCount={item.ratingCount}
          rating={item.rating}
          user={item.user}
        />
      ))}
    </div>
  );
}

export default function LiveAuctions() {
  const { state } = useTimeout();

  return (
    <Section
      className="group/section container-fluid mt-12 overflow-hidden lg:mt-16"
      title="Top boat rentals"
      description="Unsatiable it considered invitation he traveling insensible."
      headerClassName="items-end mb-4 md:mb-5 xl:mb-6 gap-5"
      rightElement={<SeeMore />}
    >
      {!state && <ListingCardLoader />}
      {state && <AuctionGrid />}
    </Section>
  );
}
