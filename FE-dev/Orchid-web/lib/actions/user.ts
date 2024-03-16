import { fetchListDataWithSearchParam } from "@/lib/generics";
import { IUser } from "@/types/dashboard";
import { SearchParams } from "@/types/table";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { api } from "../api-interceptor/api";

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


export async function updateUserInfo(
  params: string,
  data: any
): Promise<{ success: boolean; message?: string }> {
  noStore();
  const url = `/users/${params}`;

  try {
    const response = await api.put(url, data);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong!" };
  }
}


export async function getUserAddressInfo(
  params: string
 
): Promise<{ data: any}> {
  noStore();
  const url = `/userInfo/getByUserId/${params}`;

  try {
    const res = await api.get(url);

    const data = res.data.payload.in4DetailResponseList


    return { data: data };
  } catch (error) {
    console.log(error);
    return { data: [] };
    
  }
}