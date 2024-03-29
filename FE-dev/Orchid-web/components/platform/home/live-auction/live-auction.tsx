'use client';

import {destinations} from '@/data/user-working-data/destinations'
import { useTimeout } from '@/hooks/use-timeout';
import Section from '@/components/platform/section';
import BlockLoader from '@/components/loader/block-loader';
import DestinationCarousel from './live-auction-carousel';
import { useGetAuctionsWithStatus } from '@/lib/react-query/queries';
import { AuctionStatus } from '@/types/dashboard';

export default function TopAuction() {
  const { state } = useTimeout();
  const { data: commingAuction, isLoading } = useGetAuctionsWithStatus(AuctionStatus.LIVE);
  return (
    <Section
      title="Live Auction"
      description=" Đấu Giá Thời Gian Thực, Dẫn Dắt Bởi Người Đấu Giá, Cạnh Tranh, Người Ra Giá Cao Nhất Chiến Thắng."
      className="lg:container-fluid mt-12 pl-4 sm:pl-6 lg:mt-16"
      headerClassName="mb-4 md:mb-5 xl:mb-6"
    >
      {!state && isLoading &&  <BlockLoader />}
      {state && <DestinationCarousel data={commingAuction?.data!} />}
    </Section>
  );
}
