'use server'

import { AxiosResponse } from "axios";
import  { api, axiosAuth } from "@/lib/api-interceptor/api";

interface ApiResponse<T> {
  data: T[];
  pageCount: number;
}

interface ApiResponseNoParams<T> {
  data: T[];
}


export async function fetchListDataWithSearchParam<T>(
  url: string,
  searchParams: Record<string, any>
): Promise<ApiResponse<T>> {
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

export async function fetchListData<T>(
  url: string,
): Promise<ApiResponseNoParams<T>> {
  try {
    const response: AxiosResponse<{
      payload: { content: T[]};
    }> = await axiosAuth.get(url);

    const { content} = response.data.payload;

    return { data: content };
  } catch (error) {
    console.log("ERROR to fetching", error);
    return { data: [] };
  }
}

