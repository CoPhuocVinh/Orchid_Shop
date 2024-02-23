import { fetchListDataWithSearchParam } from "@/lib/generics";
import { IUser } from "@/types/dashboard";
import { SearchParams } from "@/types/table";

export async function getUserWithRoleCustomer(
  searchParams: SearchParams
): Promise<{ data: IUser[]; pageCount: number }> {
  const url = `/users?role=CUSTOMER`;

  return await fetchListDataWithSearchParam(url, searchParams);
}

export async function getUserWithRoleStaff(
  searchParams: SearchParams
): Promise<{ data: IUser[]; pageCount: number }> {
  const url = `/users?role=STAFF`;

  return await fetchListDataWithSearchParam(url, searchParams);
}
