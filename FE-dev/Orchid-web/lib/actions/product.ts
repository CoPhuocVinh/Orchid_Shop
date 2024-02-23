import { IProduct } from "@/types/dashboard";
import { SearchParams } from "@/types/table";
import { fetchListDataWithSearchParam } from "@/lib/generics";

let BASE_URL = "http://128.199.185.211:8099/api/v1"

export async function getProducts(
  searchParams: SearchParams
): Promise<{ data: IProduct[]; pageCount: number }> {
  const url = `${BASE_URL}/products`;

  return await fetchListDataWithSearchParam(url, searchParams);
}
