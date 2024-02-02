'use client';

import { vendorData } from '@/data/user-working-data/listing-details';
import { reviewsData } from '@/data/user-working-data/reviews';
// import SpecificationBlock from '@/components/listing-details/specification-block';
// import BookingForm from '@/components/listing-details/booking-form/booking-form';
// import CalenderBlock from '@/components/listing-details/calendar/calender-block';
// import DescriptionBlock from '@/components/listing-details/descripton-block';
// import EquipmentBlock from '@/components/listing-details/equipment-block';
// import LocationBlock from '@/components/listing-details/location-block';
// import ReviewBlock from '@/components/listing-details/review-block';
// import VendorBlock from '@/components/listing-details/vendor-block';
// import ChatBlock from '@/components/listing-details/chat-block';
// import { useModal } from '@/components/modals/context';
import { Button } from '@/components/ui/button';
import ListingDetailsHeroBlock from './hero-block';
import { Input } from '@/components/ui/input';

export default function ListingDetails() {
  return (
    <>
      <div className="flex justify-between gap-5 lg:gap-8 xl:gap-12 4xl:gap-16">
        <div className="w-full">
          <ListingDetailsHeroBlock vendor={vendorData.vendor} />
          {/* <DescriptionBlock description={vendorData.description} />
          <EquipmentBlock equipment={vendorData.equipment} />
          <SpecificationBlock specifications={vendorData.specifications} />
          <VendorBlock stats={reviewsData.stats} vendor={vendorData.vendor} />
          <LocationBlock />
          <CalenderBlock />
          <ReviewBlock reviewsData={reviewsData} />
          <ChatBlock /> */}


          <div className=' bg-slate-200 h-[150px] p-4 rounded-md'>
              <h1>Bind now</h1>
              <p>Bid Amount : Minimum Bid $20.00</p>

              <div className='flex mt-4 space-x-2'>
              <Input type="email" placeholder="$00.00" className='bg-zinc-300/50 focus-visible:ring-0 text-black focus-visible:ring-offset-0' />
              <Button >Place a bid</Button>
              </div>
          </div>

        </div>

      </div>
    </>
  );
}
