import { fetchListDataWithSearchParam } from "@/lib/generics";
import { IUser } from "@/types/dashboard";
import { SearchParams } from "@/types/table";

let BASE_URL = "http://128.199.185.211:8099/api/v1"

export async function getUserWithRoleCustomer(
  searchParams: SearchParams
): Promise<{ data: IUser[]; pageCount: number }> {
  const url = `${BASE_URL}/users?role=CUSTOMER`;

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
  const url = `${BASE_URL}/users?role=STAFF`;

  try {
    return await fetchListDataWithSearchParam(url, searchParams);
  } catch (error) {
    console.error('Failed to fetch data', error);
    throw error;
  }
}
