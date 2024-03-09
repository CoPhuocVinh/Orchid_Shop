import React from "react";

import BodyOrderHistory from "./_components/BodyOrderHistory";
import HeaderOrderHistory from "./_components/HeaderOrderHistory";

function layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <main className="flex-grow">
        {/* <headerOrderHistory /> */}
        <HeaderOrderHistory />
        <BodyOrderHistory />
        {children}
      </main>
    </>
  );
}

export default layout;
