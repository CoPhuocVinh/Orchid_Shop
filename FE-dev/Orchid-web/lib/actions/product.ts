import { IProduct } from "@/types/dashboard";
import { SearchParams } from "@/types/table";
import { fetchListDataWithSearchParam } from "@/lib/generics";
let baseURL = "https://orchid-be.azurewebsites.net/api/v1";

export async function getProducts(
  searchParams: SearchParams
): Promise<{ data: IProduct[]; pageCount: number }> {
  const url = `${baseURL}/products?categoryId=1.2`;

  return await fetchListDataWithSearchParam(url, searchParams);
}
