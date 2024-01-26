import ListTab from '@/components/dashboard/listTab/page';
import LocationV2 from '@/components/dashboard/location/page';
import Efficiency from '@/components/dashboard/revenueFlow/Efficiency';
import SummaryV2 from '@/components/dashboard/summary/SummaryV2';
import TaskSummary from '@/components/dashboard/summary/TaskSummary';
import Wallet from '@/components/dashboard/wallet/page';
import React from 'react'


const StatisticPage = () => {
    return (
        <>
          <section className="2xl:flex-1 2xl:mb-0 mb-6">
            <div className="w-full mb-[24px] xl:flex xl:space-x-[24px]">
              <SummaryV2 />
              <Efficiency height="h-[180px]" />
            </div>
            <div className="w-full mb-[24px] flex space-x-[24px]">
              <LocationV2 />
              <TaskSummary />
            </div>
    
            <ListTab />
          </section>
          <section className="flex w-full flex-col space-x-0 lg:flex-row lg:space-x-6 2xl:w-[400px] 2xl:flex-col 2xl:space-x-0">
            <Wallet />
            {/* <Calender /> */}
          </section>
        </>
      );
}

export default StatisticPage