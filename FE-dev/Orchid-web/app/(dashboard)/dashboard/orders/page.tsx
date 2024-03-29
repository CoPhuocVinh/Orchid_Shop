import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Shell } from "@/components/shell";
import { getOrders } from "@/lib/actions";
import { SearchParams } from "@/types/table";
import React from "react";
import { OrderTable } from "./_components/order-table";
export interface IndexPageProps {
  searchParams: SearchParams;
}
const HistoryPage = ({ searchParams }: IndexPageProps) => {
  const orders = getOrders(searchParams);
  return (
    <main className="w-full min-h-screen px-6 pb-6 pt-[100px] sm:pt-[156px] xl:px-[48px] xl:pb-[48px] dark:bg-darkblack-700">
      <div className="2xl:flex-col  2xl:space-x-[48px]">
        <section className="mb-6 2xl:mb-0 2xl:flex-1 overflow-auto">
          <Shell>
            <React.Suspense
              fallback={
                <DataTableSkeleton columnCount={4} filterableColumnCount={2} />
              }
            >
              <OrderTable orderPromise={orders} />
            </React.Suspense>
          </Shell>
        </section>
      </div>
    </main>
  );
};

export default HistoryPage;
