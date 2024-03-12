
"use server";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import { SearchParams } from "@/types/table";
import { fetchListDataWithSearchParam } from "@/lib/generics";
import { IOrder } from "@/types/dashboard";



export async function getOrders(
  searchParams: SearchParams
): Promise<{ data: IOrder[]; pageCount: number }> {
  noStore();
  const url = `/orders/list`;

  return await fetchListDataWithSearchParam(url, searchParams);
}
export async function getOrdersByUserId(
  searchParams: SearchParams,
  userId: string
): Promise<{ data: IOrder[]; pageCount: number }> {
  noStore();
  const url = `/orders/list?userID=${userId}`;

  return await fetchListDataWithSearchParam(url, searchParams);
}