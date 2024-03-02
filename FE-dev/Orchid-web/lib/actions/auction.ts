"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { IAuction } from "@/types/dashboard";
import { SearchParams } from "@/types/table";
import { fetchListData, fetchListDataWithSearchParam } from "@/lib/generics";
import { api } from "../api-interceptor/api";

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

interface AuctionStatusUpdate {
  id: string;
  status: string;
}
export async function updateStatusAuction({ id, status }: AuctionStatusUpdate) {
  try {
    const res = await api.post(`/auctions/update-status`, { id, status });

    revalidatePath("/dashboard/auctions");
  } catch (error) {
    console.log("FALI");
  }
}

export async function deleteAuction({ id }: { id: string }) {
  try {
    await api.post(`/auctions/delete-auction`, { id });

    revalidatePath("/dashboard/auctions");
  } catch (error) {
    console.log("Fail to delete: ", error);
  }
}
