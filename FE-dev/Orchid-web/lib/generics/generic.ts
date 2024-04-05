"use server";

import { AxiosResponse } from "axios";
import { axiosAuth } from "@/lib/api-interceptor/api";
export interface ApiListResponse<T> {
  data: T[];
  pageCount?: number;
}

export interface ApiSingleResponse<T> {
  data: T | null;
}

export async function fetchListData<T>(
  url: string,
  searchParams?: Record<string, any>
): Promise<ApiListResponse<T>> {
  try {
    const response: AxiosResponse<{
      payload: { content: T[]; totalPages: number };
    }> = await axiosAuth.get(url, { params: searchParams });

    const { content, totalPages } = response.data.payload;

    return { data: content, pageCount: totalPages };
  } catch (error) {
    console.log("ERROR to fetching", error);
    return { data: [], pageCount: 0 };
  }
}

export async function fetchSingleData<T>(
  url: string,
): Promise<ApiSingleResponse<T>> {
  try {
    const response: AxiosResponse<{ payload: T}> =
      await axiosAuth.get(url);

    const { payload } = response.data;

    return { data: payload };
  } catch (error) {
    console.log("ERROR to fetching", error);
    return { data: null };
  }
}
