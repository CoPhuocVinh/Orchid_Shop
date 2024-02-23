import { unstable_noStore as noStore } from "next/cache";
import { IProduct } from "@/types/dashboard";
import { SearchParams } from "@/types/table";
import { fetchListDataWithSearchParam } from "@/lib/generics";

let BASE_URL = "https://orchid.fams.io.vn/api/v1";

export async function getProducts(
  searchParams: SearchParams
): Promise<{ data: IProduct[]; pageCount: number }> {
  noStore();
  const url = `/products`;

  return await fetchListDataWithSearchParam(url, searchParams);
}
