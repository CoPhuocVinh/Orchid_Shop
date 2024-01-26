import ListTab from "@/components/dashboard/listTab/page";
import Wallet from "@/components/dashboard/wallet/page";
import React from "react";


const TransactionPage = () => {
  return (
    <>
      <section className="2xl:w-70 w-full 2xl:mb-0 mb-6">
        <ListTab pageSize={9} />
      </section>
      <section className="2xl:flex-1 w-full">
        <Wallet />
      </section>
    </>
  );
};

export default TransactionPage;
