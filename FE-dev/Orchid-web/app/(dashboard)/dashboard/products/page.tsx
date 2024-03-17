import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Shell } from "@/components/shell";
import React from "react";
import { SearchParams } from "@/types/table";
import { ProductTable } from "./_components/product-table";
import { useGetProducts } from "@/lib/react-query/queries";
import { getProducts } from "@/lib/actions";
export interface IndexPageProps {
  searchParams: SearchParams;
}

const ProductsPage = ({ searchParams }: IndexPageProps) => {
  const products = getProducts(searchParams);

  return (
    <>
      <div className="2xl:flex-1 w-full min-h-screen">
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
