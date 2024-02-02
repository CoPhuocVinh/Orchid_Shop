'use client';

import {destinations} from '@/data/user-working-data/destinations'
import { useTimeout } from '@/hooks/use-timeout';
import Section from '@/components/platform/section';
import BlockLoader from '@/components/loader/block_loader';
import DestinationCarousel from './top-auction-carousel';

export default function TopAuction() {
  const { state } = useTimeout();

  return (
    <Section
      title="Top destinations for boat rentals"
      description="Unsatiable it considered invitation he traveling insensible."
      className="lg:container-fluid mt-12 pl-4 sm:pl-6 lg:mt-16"
      headerClassName="mb-4 md:mb-5 xl:mb-6"
    >
      {!state && <BlockLoader />}
      {state && <DestinationCarousel data={destinations} />}
    </Section>
  );
}
