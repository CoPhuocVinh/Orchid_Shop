'use server'

import { unstable_noStore as noStore } from "next/cache";
import { ICategory } from "@/types/dashboard";

import { ApiListResponse, fetchListData } from "@/lib/generics";

export async function getCategories(): Promise<ApiListResponse<ICategory>> {
  noStore();
  const url = `/categories`;

  return await fetchListData(url);
}
