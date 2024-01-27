import React from "react";
import TotalWidget from "@/components/dashboard/widget/total-widget";
import RevenueFlow from "@/components/dashboard/revenueFlow/page";
import Efficiency from "@/components/dashboard/revenueFlow/Efficiency";
import ListTab from "@/components/dashboard/listTab/page";
import Wallet from "@/components/dashboard/wallet/page";

const DashboardPage = () => {
  return (
    <main className="w-full px-6 pb-6 pt-[100px] sm:pt-[156px] xl:px-12 xl:pb-12">
      {/* write your code here */}
      <div className="2xl:flex 2xl:space-x-[48px]">
        <section className="mb-6 2xl:mb-0 2xl:flex-1">
          <TotalWidget />
          <div className="mb-[24px] w-full xl:flex xl:space-x-[24px]">
            <RevenueFlow />
            <Efficiency />
          </div>

          <ListTab />
        </section>
        <section className="flex w-full flex-col space-x-0 lg:flex-row lg:space-x-6 2xl:w-[400px] 2xl:flex-col 2xl:space-x-0">
          <Wallet />
        </section>
      </div>
    </main>
  );
};

export default DashboardPage;
