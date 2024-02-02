import AuctionListing from '@/components/platform/auction/auction-listing'
import Filter from '@/components/platform/auction/filter'
import FilterTopbar from '@/components/platform/auction/filter-topbar'
import React from 'react'

const AuctionPage = () => {
  return (
    <div className="container-fluid mb-12 pt-6 lg:mb-16">
    <FilterTopbar />
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-[330px_5fr] 3xl:gap-12">
      <Filter className="hidden xl:block" />
      <AuctionListing />
    </div>
  </div>
  )
}

export default AuctionPage