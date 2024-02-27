'use client';

import { useState } from 'react';
import { topBoats } from '@/data/user-working-data/top-boats';
import ListingCard from '../home/live-auction/live-auction-card';
import { Button } from '@/components/ui/button';
import { useGetLiveAuction } from '@/lib/react-query/queries';

export default function AuctionListing() {
  const [list, setList] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const { data: liveAuction, isLoading: auctionLoading } = useGetLiveAuction();
  function handleLoadMore() {
    setIsLoading(true);
    setTimeout(() => {
      setList((prevList) => prevList + 10);
      setIsLoading(false);
    }, 600);
  }
  return (
    <div>
      <div className="mt-1 grid grid-cols-1 gap-x-5 gap-y-8 xs:grid-cols-2 lg:grid-cols-3 3xl:gap-y-10 4xl:grid-cols-4">
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
        />
        ))}
      </div>
      {topBoats.length >= list && (
        <Button
          type="button"
          onClick={() => handleLoadMore()}
          className="relative bottom-0 left-1/2 z-30 mx-auto mt-16 -translate-x-1/2 px-6 py-2.5 md:sticky md:bottom-10 md:text-base xl:relative xl:bottom-0"
        >
          Load more
        </Button>
      )}
    </div>
  );
}
