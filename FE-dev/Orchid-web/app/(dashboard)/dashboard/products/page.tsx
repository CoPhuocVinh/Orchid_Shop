import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Shell } from "@/components/shell";
import React from "react";
import { productFakeData } from "./_components/fake-product-data";
import { SearchParams } from "@/types/table";
import { ProductTable } from "./_components/product-table";
export interface IndexPageProps {
  searchParams: SearchParams;
}

const ProductsPage = async ({ searchParams }: IndexPageProps) => {
  const products = productFakeData(searchParams);
  return (
    <>
      <div className="2xl:flex-1 w-full">
        <Shell>
          <React.Suspense
            fallback={
              <DataTableSkeleton columnCount={4} filterableColumnCount={2} />
            }
          >
            <ProductTable productPromise={products} />
          </React.Suspense>
        </Shell>
      </div>
    </>
  );
};

export default ProductsPage;
