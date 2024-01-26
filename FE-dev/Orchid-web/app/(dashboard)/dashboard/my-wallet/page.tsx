import AddBalance from '@/components/dashboard/addBalance/add-balance';
import ListTab from '@/components/dashboard/listTab/page';
import EfficiencyV2 from '@/components/dashboard/revenueFlow/EfficiencyV2';
import SummaryV3 from '@/components/dashboard/summary/SummaryV3';
import Wallet from '@/components/dashboard/wallet/page';
import React from 'react'


const MyWallet = () => {
    return (
        <>
          <section className="2xl:w-[424px]">
            <AddBalance />
            <Wallet />
          </section>
          <div className="2xl:flex-1">
            <section className="w-full xl:flex xl:space-x-[24px]">
              <SummaryV3 />
              <EfficiencyV2 />
            </section>
            <ListTab />
          </div>
        </>
      );
}

export default MyWallet