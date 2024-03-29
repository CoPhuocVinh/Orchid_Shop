import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Shell } from "@/components/shell";
import { getTransactions } from "@/lib/actions/transaction";
import { SearchParams } from "@/types/table";
import React from "react";
import { TransactionTable } from "./_components/transaction-table";
import TotalWidget from "./_components/total-widget";

export interface IndexPageProps {
  searchParams: SearchParams;
}
const TransactionPage = ({ searchParams }: IndexPageProps) => {
  const transaction = getTransactions(searchParams);

  const search_all = { page: "1", per_page: "100" };
  const transactionDashboard = getTransactions(search_all);

  return (
    <>
      <section className=" w-full 2xl:mb-0 mb-6">
        <Shell>
          <React.Suspense
            fallback={
              <DataTableSkeleton columnCount={4} filterableColumnCount={2} />
            }
          >
            <TotalWidget transactionPromise={transactionDashboard} />
            <TransactionTable transactionPromise={transaction} />
          </React.Suspense>
        </Shell>
      </section>
    </>
  );
};

export default TransactionPage;
