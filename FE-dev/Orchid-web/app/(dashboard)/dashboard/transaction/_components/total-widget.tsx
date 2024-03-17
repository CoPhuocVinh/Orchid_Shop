import totalEarn from "/public/static/images/icons/total-earn.svg";
import memberImg from "/public/static/images/avatar/members-2.png";
import TotalWidgetCard from "./total-widget-card";
import { getTransactions } from "@/lib/actions/transaction";
import React from "react";

interface TotalWidgetProps {
  transactionPromise: ReturnType<typeof getTransactions>;
}

const TotalWidget = ({ transactionPromise }: TotalWidgetProps) => {
  // const { data } = React.use(transactionPromise);

  //task chú tuấn nè
  // console.log(data.length);

  return (
    <div className="mb-[24px] w-full">
      <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-3">
        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Total earnings"
          amount="7,245.00"
          groth="+ 3.5%"
          id="totalEarn"
        />
        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Total Spending"
          amount="7,245.00"
          groth="+ 3.5%"
          id="totalSpending"
        />
        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Spending Goal"
          amount="7,245.00"
          groth="+ 3.5%"
          id="totalGoal"
        />
      </div>
    </div>
  );
};

export default TotalWidget;
