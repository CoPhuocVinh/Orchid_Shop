"use client";
import totalEarn from "/public/static/images/icons/total-earn.svg";
import memberImg from "/public/static/images/avatar/members-2.png";
import TotalWidgetCard from "./total-widget-card";
import { getTransactions } from "@/lib/actions/transaction";
import React from "react";

interface TotalWidgetProps {
  transactionPromise: ReturnType<typeof getTransactions>;
}
interface GroupedTransaction {
  [key: string]: { code: string; amount: number };
}
const TotalWidget = ({ transactionPromise }: TotalWidgetProps) => {
  const { data } = React.use(transactionPromise);

  const transactionCodes = data.map((item) => ({
    code: item.transactionCode
      .substring(0, item.transactionCode.indexOf("-"))
      .toUpperCase(),
    amount: item.amount,
  }));

  const codeToTitleIdMap = [
    { code: "RT", title: "Total withdraw", id: "totalEarn" },
    { code: "NT", title: "Total Recharge", id: "totalSpending" },
    { code: "HT", title: "Total Refund", id: "totalGoal" },
  ];
  const groupedTransactionCodes: GroupedTransaction = transactionCodes.reduce(
    (acc: GroupedTransaction, curr) => {
      const key = curr.code.substring(0, 2);
      if (!acc[key]) {
        acc[key] = { code: key, amount: 0 };
      }
      acc[key].amount += curr.amount;
      return acc;
    },
    {}
  );
  const groupedArray = Object.values(groupedTransactionCodes);

  const getAmountByCode = (code: string) => {
    const item = codeToTitleIdMap.find((item) => item.code === code);
    if (item) {
      return groupedArray.find((g) => g.code === code)?.amount || 0;
    }
    return 0;
  };
  // console.log(data)
  //task chú tuấn nè

  return (
    <div className="mb-[24px] w-full">
      <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-3">
        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Total Withdraw"
          groth=""
          amount={getAmountByCode("RT").toString()}
          id="totalEarn"
        />
        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Total Recharge"
          groth=""
          amount={getAmountByCode("NT").toString()}
          id="totalSpending"
        />
        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Total Refund"
          groth=""
          amount={getAmountByCode("HT").toString()}
          id="totalGoal"
        />
      </div>
    </div>
  );
};

export default TotalWidget;
