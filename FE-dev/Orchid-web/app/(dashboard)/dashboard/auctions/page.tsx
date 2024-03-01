// "use client";

import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Shell } from "@/components/shell";
import React from "react";
import { SearchParams } from "@/types/table";
import {  AuctionTable } from "./_components/auction-table";
import { useGetProducts } from "@/lib/react-query/queries";
import { getProducts } from "@/lib/actions";
import { getTableAuctions } from "@/lib/actions/auction";
export interface IndexPageProps {
  searchParams: SearchParams;
}

const AuctionDashBoardPage = ({ searchParams }: IndexPageProps) => {
  // const { data: products, isLoading: productLoading } =
  //   useGetProducts(searchParams);
  const auctions = getTableAuctions(searchParams);

  return (
    <>
      <div className="2xl:flex-1 w-full">
        <Shell>
          {/* {productLoading ? (
            <DataTableSkeleton columnCount={4} filterableColumnCount={2} />
          ) : (
            <Auction
              products={products?.data ?? []}
              pageCount={products?.pageCount ?? 0}
            />
          )} */}

          <React.Suspense
            fallback={
              <DataTableSkeleton columnCount={4} filterableColumnCount={2} />
            }
          >
            <AuctionTable
              auctionPromise={auctions}
              // products={products?.data ?? []}
              // pageCount={products?.pageCount ?? 0}
            />
          </React.Suspense>
        </Shell>
      </div>
    </>
  );
};

export default AuctionDashBoardPage;
