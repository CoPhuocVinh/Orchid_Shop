"use server";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import { SearchParams } from "@/types/table";
import { fetchListDataWithSearchParam } from "@/lib/generics";

import { ITransaction } from "@/types/dashboard/transaction-type";



export async function getTransactions(
  searchParams: SearchParams
): Promise<{ data: ITransaction[]; pageCount: number }> {
  noStore();
  const url = `/transactions`;

  revalidatePath("/")
  return await fetchListDataWithSearchParam(url, searchParams);
}