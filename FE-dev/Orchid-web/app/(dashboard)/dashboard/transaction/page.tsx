import Wallet from "@/components/dashboard/wallet/page";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Shell } from "@/components/shell";
import { getTransactions } from "@/lib/actions/transaction";
import { SearchParams } from "@/types/table";
import React from "react";
import { TransactionTable } from "./_components/transaction-table";

export interface IndexPageProps {
  searchParams: SearchParams;
}
const TransactionPage = ({ searchParams }: IndexPageProps) => {
  const transaction = getTransactions(searchParams);
  return (
    <>
   

      <section className=" w-full 2xl:mb-0 mb-6">
        <Shell>
          <React.Suspense
            fallback={
              <DataTableSkeleton columnCount={4} filterableColumnCount={2} />
            }
          >
            <TransactionTable transactionPromise={transaction} />
          </React.Suspense>
        </Shell>
      </section>
    </>
  );
};

export default TransactionPage;
