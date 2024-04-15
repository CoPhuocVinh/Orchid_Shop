"use server";

import { ApiListResponse, fetchListData } from "@/lib/generics";
import { IAdress, IUser } from "@/types/dashboard";
import { SearchParams } from "@/types/table";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { api, axiosAuth } from "@/lib/api-interceptor/api";

export async function getUserWithRoleCustomer(
  searchParams: SearchParams
): Promise<ApiListResponse<IUser>> {
  const url = `/users?role=CUSTOMER`;

  noStore();
  return await fetchListData(url, searchParams);
}

export async function getUserWithRoleStaff(
  searchParams: SearchParams
): Promise<ApiListResponse<IUser>> {
  const url = `/users?role=STAFF`;
  noStore();

  return await fetchListData(url, searchParams);
}

export async function updateUserInfo(
  params: string,
  data: any
): Promise<{ success: boolean; message?: string }> {
  noStore();
  const url = `/users/${params}`;

  try {
    const response = await axiosAuth.put(url, data);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong!" };
  }
}

export async function getUserAddressInfo(
  params: string
): Promise<{ data: any }> {
  noStore();
  const url = `/userInfo/getByUserId/${params}`;

  try {
    const res = await axiosAuth.get(url);

    const data = res.data.payload.in4DetailResponseList;

    return { data: data };
  } catch (error) {
    console.log(error);
    return { data: [] };
  }
}

export async function createUserAddressInfo(
  params: string,
  data: IAdress
): Promise<void> {
  noStore();

  const url = `/userInfo/CreateUserIn4ByUserId/${params}`;

  try {
    await axiosAuth.post(url, data);

    revalidatePath("/profile");
  } catch (error) {
    console.log(error);
    throw error;
  }
}
