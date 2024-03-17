import React from "react";

import AuctionHeader from "@/components/platform/header/auction-header";
import Footer from "@/components/platform/footer/footer";

function layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <main className="">
        <AuctionHeader />

        {children}
        <Footer className="pb-0 pt-32 3xl:px-12 4xl:px-12" />
      </main>
    </>
  );
}

export default layout;
