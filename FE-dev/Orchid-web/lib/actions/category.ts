import { unstable_noStore as noStore } from "next/cache";
import { ICategory } from "@/types/dashboard";

import { api, axiosAuth } from "../api-interceptor/api";

export async function getCategories(): Promise<{
  data: ICategory[];
}> {
  noStore();
  const url = `/categories`;

  try {
    const res = await axiosAuth.get(url);

    const data = res.data.payload.content

    return { data: data };
  } catch (error) {
    return { data: [] };
  }
}
