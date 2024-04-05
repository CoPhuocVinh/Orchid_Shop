"use server";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import { SearchParams } from "@/types/table";
import { ApiListResponse, ApiSingleResponse, fetchListData, fetchSingleData } from "@/lib/generics";
import { IOrder } from "@/types/dashboard";
import { api, axiosAuth } from "@/lib/api-interceptor/api";

export async function getOrders(
  searchParams: SearchParams
): Promise<ApiListResponse<IOrder>> {
  noStore();
  const url = `/orders/list`;

  return await fetchListData(url, searchParams);
}
export async function getOrdersByUserId(
  searchParams: SearchParams,
  userId: string
): Promise<ApiListResponse<IOrder>> {
  noStore();
  const url = `/orders/list?userId=${userId}`;

  return await fetchListData(url, searchParams);
}
export async function getOrderId(
  params: string
): Promise<ApiSingleResponse<IOrder>> {
  noStore();
  const url = `/orders/${params}`;

  return await fetchSingleData(url);

  // return await fetchDataByID(url);
}

export async function confirmOrderDelivery({ orderId, confirmed }: any) {
  try {
    const res = await axiosAuth.put(`/orders/${orderId}`, { confirmed: confirmed });

    revalidatePath("/dashboard/orders");
  } catch (error) {
    console.log("FALI to updateStatusAcceptAuction");
  }
}
