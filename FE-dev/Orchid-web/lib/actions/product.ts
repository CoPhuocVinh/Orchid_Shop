import { IProduct } from "@/types/dashboard";
import { SearchParams } from "@/types/table";
import { fetchListDataWithSearchParam } from "@/lib/generics";

export async function getProducts(
  searchParams: SearchParams
): Promise<{ data: IProduct[]; pageCount: number }> {
  const url = `/products?categoryId=1.2`;

  return await fetchListDataWithSearchParam(url, searchParams);
}
