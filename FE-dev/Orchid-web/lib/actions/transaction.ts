"use server";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import { SearchParams } from "@/types/table";
import { ApiListResponse, fetchListData } from "@/lib/generics";

import { ITransaction } from "@/types/dashboard/transaction-type";

export async function getTransactions(
  searchParams: SearchParams
): Promise<ApiListResponse<ITransaction>> {
  noStore();
  const url = `/transactions`;

  revalidatePath("/");
  return await fetchListData(url, searchParams);
}

export async function getTransactionByUserId(
  searchParams: SearchParams,
  userId: string
): Promise<ApiListResponse<ITransaction>> {
  noStore();
  const url = `/transactions?userId=${userId}`;

  return await fetchListData(url, searchParams);
}
