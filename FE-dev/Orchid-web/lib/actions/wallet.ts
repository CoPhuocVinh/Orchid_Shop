'use server'

import { revalidatePath } from "next/cache";
import { axiosAuth } from "@/lib/api-interceptor/api";
import { IWallet } from "@/types/dashboard";
import { ApiSingleResponse, fetchSingleData } from "@/lib/generics";

export async function getWalletByUserId(
  params: string
): Promise<ApiSingleResponse<IWallet>> {
  if (!params) {
    return { data: null };
  }
  const url = `/wallets/get-balance-by-userId/${params}`;
  return await fetchSingleData(url);

}

export async function addMoneyToWallet(
  userId: string,
  price: number
): Promise<string | null> {
  const url = `/wallets/recharge-wallet-by-userId/${userId}`;


try {

    const res = await axiosAuth.post(url, {recharge: price});


    if (res.status === 200 && res.data.status === "SUCCESS") {
      return res.data.payload;
      
    } else {
      console.error("Error:", res.data.error);
      return null;
    }
  
  } catch (error) {
    console.error(error);
    return null;
  }
}
