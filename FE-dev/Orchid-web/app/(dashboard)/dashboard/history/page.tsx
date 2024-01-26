import HistoryTable from '@/components/dashboard/listTab/HistoryTable'
import Wallet from '@/components/dashboard/wallet/page'
import React from 'react'

const HistoryPage = () => {
    <>
    <section className="mb-6 2xl:mb-0 2xl:flex-1">
      <HistoryTable />
    </section>
    <section className="2xl:w-[400px] w-full flex flex-col lg:flex-row 2xl:space-x-0 2xl:flex-col lg:space-x-6 space-x-0">
      <Wallet />
    </section>
  </>
}

export default HistoryPage