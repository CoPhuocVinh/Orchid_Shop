"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import {
  AuctionStatus,
  IAuction,
  IAuctionCreateField,
} from "@/types/dashboard";
import { SearchParams } from "@/types/table";
import { fetchListData, fetchListDataWithSearchParam } from "@/lib/generics";
import { api } from "../api-interceptor/api";

export async function getAuctions(): Promise<{ data: IAuction[] }> {
  noStore();
  const url = `/auctions/list?page=1&per_page=8`;

  return await fetchListData(url);
}

export async function getAuctionsWithStatus(
  status: AuctionStatus
): Promise<{ data: IAuction[] }> {
  noStore();

  const url = `/auctions/list?page=1&per_page=8&status=${status}`;

  return await fetchListData(url);
}

export async function getAuctionByID(
  params: string
): Promise<{ data: IAuction | null }> {
  noStore();
  const url = `/auctions/${params}`;

  try {
    const res = await api.get(url);

    return { data: res.data.payload };
  } catch (error) {
    return { data: null };
  }

  // return await fetchDataByID(url);
}

export async function getTableAuctions(
  searchParams: SearchParams
): Promise<{ data: IAuction[]; pageCount: number }> {
  noStore();
  const url = `/auctions/list`;

  return await fetchListDataWithSearchParam(url, searchParams);
}

interface AuctionStatusUpdate {
  id: number;
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

export async function deleteAuction(params: string) {
  try {
    await api.delete(`/auctions/${params}`);

    revalidatePath("/dashboard/auctions");
  } catch (error) {
    console.log("Fail to delete: ", error);
  }
}

export async function updateAuctionDetail(
  params: string,
  data: IAuctionCreateField
): Promise<void> {
  noStore();
  const url = `/auctions/update-auction/${params}`;

  try {
    await api.put(url, data);

    revalidatePath("/dashboard/auctions");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createAuction(data: IAuctionCreateField): Promise<void> {
  noStore();
  const url = `/auctions/create`;

  try {
    await api.post(url, data);

    revalidatePath("/dashboard/auctions");
  } catch (error) {
    console.log(error);
    throw error;
  }
}
