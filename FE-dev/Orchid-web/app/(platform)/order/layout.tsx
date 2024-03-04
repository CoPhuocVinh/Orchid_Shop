import React, { Children } from "react";

import OrderHeader from "./_components/OrderHeader";
import BodyOrder from "./_components/BodyOrder";
function layoutOrder({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <main className="flex-grow">
        <OrderHeader />
        <BodyOrder />
        {children}
      </main>
    </>
  );
}

export default layoutOrder;
