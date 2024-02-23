import { fetchListDataWithSearchParam } from "@/lib/generics";
import { IUser } from "@/types/dashboard";
import { SearchParams } from "@/types/table";
import { unstable_noStore as noStore } from "next/cache";

let BASE_URL = "https://orchid.fams.io.vn/api/v1"

export async function getUserWithRoleCustomer(
  searchParams: SearchParams
): Promise<{ data: IUser[]; pageCount: number }> {
  const url = `/users?role=CUSTOMER`;
  noStore()
  try {
    return await fetchListDataWithSearchParam(url, searchParams);
  } catch (error) {
    console.error('Failed to fetch data', error);
    throw error;
  }
}

export async function getUserWithRoleStaff(
  searchParams: SearchParams
): Promise<{ data: IUser[]; pageCount: number }> {
  const url = `/users?role=STAFF`;
  noStore()

  try {
    return await fetchListDataWithSearchParam(url, searchParams);
  } catch (error) {
    console.error('Failed to fetch data', error);
    throw error;
  }
}
