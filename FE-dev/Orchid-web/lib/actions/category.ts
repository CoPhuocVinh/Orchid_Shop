import { unstable_noStore as noStore } from "next/cache";
import { ICategory } from "@/types/dashboard";

import { api } from "../api-interceptor/api";

export async function getCategories(): Promise<{
  data: ICategory[];
}> {
  noStore();
  const url = `/categories`;

  try {
    const res = await api.get(url);

    const data = res.data.payload.content

    return { data: data };
  } catch (error) {
    return { data: [] };
  }
}
