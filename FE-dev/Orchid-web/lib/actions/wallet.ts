import { revalidatePath } from "next/cache";
import { api } from "../api-interceptor/api";
import { IWallet } from "@/types/dashboard";

export async function getWalletByUserId(
  params: string
): Promise<{ data: IWallet | null }> {
  const url = `/wallets/get-balance-by-userId/${params}`;

  try {
    const res = await api.get(url);

    return { data: res.data.payload };
  } catch (error) {
    return { data: null };
  }

  // return await fetchDataByID(url);
}

export async function addMoneyToWallet(
  userId: string,
  price: number
): Promise<string | null> {
  const url = `/wallets/recharge-wallet-by-userId/${userId}`;

  try {
    const res = await api.post(url, {recharge: price});


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
