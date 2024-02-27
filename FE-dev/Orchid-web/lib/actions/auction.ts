import { unstable_noStore as noStore } from "next/cache";
import { IAuction } from "@/types/dashboard";
import { SearchParams } from "@/types/table";
import { fetchListData, fetchListDataWithSearchParam } from "@/lib/generics";

let BASE_URL = "https://orchid.fams.io.vn/api/v1";

export async function getAuctions(): Promise<{ data: IAuction[] }> {
  noStore();
  const url = `/auctions/list?page=1&per_page=8`;

  return await fetchListData(url);
}

export async function getTableAuctions(
  searchParams: SearchParams
): Promise<{ data: IAuction[]; pageCount: number }> {
  noStore();
  const url = `/auctions/list`;

  return await fetchListDataWithSearchParam(url, searchParams);
}
