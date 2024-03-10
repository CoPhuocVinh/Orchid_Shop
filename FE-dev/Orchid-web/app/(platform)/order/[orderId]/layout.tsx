import React, { Children } from "react";

import AuctionHeader from "@/components/platform/header/auction-header";
import Footer from "@/components/platform/footer/footer";
function layoutOrder({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <main className="flex-grow">
        <AuctionHeader />

        {children}
        <Footer className="pb-0 3xl:px-12 4xl:px-12" />
      </main>
    </>
  );
}

export default layoutOrder;
