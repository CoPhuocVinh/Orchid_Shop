'use client'
import React from "react";
// import TotalWidget from "@/components/dashboard/widget/total-widget";
// import RevenueFlow from "@/components/dashboard/revenueFlow/page";
// import Efficiency from "@/components/dashboard/revenueFlow/Efficiency";
import { useSession } from "next-auth/react";

const DashboardPage = () => {

  const {data: session} = useSession();

  const isAdmin = session?.user.role === "ADMIN"


  return (
    <main className="w-full min-h-screen  px-6 pb-6 pt-[100px] sm:pt-[156px] xl:px-12 xl:pb-12">
      {/* write your code here */}
      <div className="2xl:flex 2xl:space-x-[48px]">
        <section className="mb-6 2xl:mb-0 2xl:flex-1">
          {/* <TotalWidget />
          <div className="mb-[24px] h-[500px] w-full xl:flex xl:space-x-[24px]">
            <Efficiency />
            <RevenueFlow />
          </div> */}

  
        </section>
        {/* <section className="flex w-full flex-col space-x-0 lg:flex-row lg:space-x-6 2xl:w-[400px] 2xl:flex-col 2xl:space-x-0">
          <Wallet />
        </section> */}
      </div>
    </main>
  );
};

export default DashboardPage;
