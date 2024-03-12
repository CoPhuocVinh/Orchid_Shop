"use server";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import { SearchParams } from "@/types/table";
import { fetchListDataWithSearchParam } from "@/lib/generics";

import { ITransaction } from "@/types/dashboard/transaction";



export async function getTransactions(
  searchParams: SearchParams
): Promise<{ data: ITransaction[]; pageCount: number }> {
  noStore();
  const url = `/transactions`;

  return await fetchListDataWithSearchParam(url, searchParams);
}