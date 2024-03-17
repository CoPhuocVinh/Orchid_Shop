"use server";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import { SearchParams } from "@/types/table";
import { fetchListDataWithSearchParam } from "@/lib/generics";
import { IOrder } from "@/types/dashboard";
import { api } from "../api-interceptor/api";

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
  const url = `/orders/list?userId=${userId}`;

  return await fetchListDataWithSearchParam(url, searchParams);
}
export async function getOrderId(
  params: string
): Promise<{ data: IOrder | null }> {
  noStore();
  const url = `/orders/${params}`;

  try {
    const res = await api.get(url);

    return { data: res.data.payload };
  } catch (error) {
    return { data: null };
  }

  // return await fetchDataByID(url);
}

export async function confirmOrderDelivery({ orderId,  confirmed } : any) {

  try {
    const res = await api.put(`/orders/${orderId}`, {  confirmed: confirmed });

    revalidatePath("/dashboard/orders");
  } catch (error) {
    console.log("FALI to updateStatusAcceptAuction");
  }
}
