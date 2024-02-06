import { Task } from "./users-table-column-def";
import axios from "axios";

import { SearchParams } from "@/types/table";

export async function getDataFake(
  searchParams: SearchParams
): Promise<{ data: Task[]; pageCount: number }> {
  //   console.log(searchParams)
  try {
    const res = await axios.get(`http://localhost:8000/api/v1/tasks`, {
      params: searchParams,
    });

    const data = await res.data.data;
    const pageCount = await res.data.pageCount;

    return { data: data, pageCount };
  } catch (error) {
    console.log(error);
    return { data: [], pageCount: 0 };
  }
}
