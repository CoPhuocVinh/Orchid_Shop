import { fetchListDataWithSearchParam } from "@/lib/generics";
import { IUser } from "@/types/dashboard";
import { SearchParams } from "@/types/table";
let baseURL = "https://orchid-be.azurewebsites.net/api/v1";

export async function getUserWithRoleCustomer(
  searchParams: SearchParams
): Promise<{ data: IUser[]; pageCount: number }> {
  const url = `${baseURL}/users?role=CUSTOMER`;

  return await fetchListDataWithSearchParam(url, searchParams);
}

export async function getUserWithRoleStaff(
  searchParams: SearchParams
): Promise<{ data: IUser[]; pageCount: number }> {
  const url = `${baseURL}/users?role=STAFF`;

  return await fetchListDataWithSearchParam(url, searchParams);
}
