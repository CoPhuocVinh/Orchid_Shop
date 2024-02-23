import axios, { AxiosResponse } from "axios";
import { api } from "@/lib/api-interceptor/api";

interface ApiResponse<T> {
  data: T[];
  pageCount: number;
}

export async function fetchListDataWithSearchParam<T>(
  url: string,
  searchParams: Record<string, any>
): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<{
      payload: { content: T[]; totalPages: number };
    }> = await axios.get(url, { params: searchParams });

    const { content, totalPages } = response.data.payload;

    return { data: content, pageCount: totalPages };
  } catch (error) {
    console.log("ERROR to fetching", error);
    return { data: [], pageCount: 0 };
  }
}
