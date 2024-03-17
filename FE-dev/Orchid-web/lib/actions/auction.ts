"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import {
  AuctionStatus,
  IAuction,
  IAuctionCreateField,
} from "@/types/dashboard";
import { SearchParams } from "@/types/table";
import { fetchListData, fetchListDataWithSearchParam } from "@/lib/generics";
import { api } from "../api-interceptor/api";
import axios from "axios";

export async function getAuctions(): Promise<{ data: IAuction[] }> {
  noStore();
  const url = `/auctions/list?page=1&per_page=8`;

  return await fetchListData(url);
}

export async function getAuctionsWithStatus(
  status: string
): Promise<{ data: IAuction[] }> {
  noStore();

  const url = `/auctions/list?page=1&per_page=8&status=${status}`;

  return await fetchListData(url);
}

export async function getAuctionByID(
  params: string
): Promise<{ data: IAuction | null }> {
  noStore();
  const url = `/auctions/${params}`;

  try {
    const res = await api.get(url);

    return { data: res.data.payload };
  } catch (error) {
    return { data: null };
  }

  // return await fetchDataByID(url);
}

export async function getTableAuctions(
  searchParams: SearchParams
): Promise<{ data: IAuction[]; pageCount: number }> {
  noStore();
  const url = `/auctions/list`;

  return await fetchListDataWithSearchParam(url, searchParams);
}

interface AuctionStatusUpdate {
  id: number;
  status: string;
}
export async function updateStatusAuction({ id, status }: AuctionStatusUpdate) {
  try {
    const res = await api.put(`/auctions/update-auction/${id}`, { status });

    revalidatePath("/dashboard/auctions");
  } catch (error) {
    console.log("FALI");
  }
}
export async function updateStatusAcceptAuction({ id,  approved } : any) {

  try {
    const res = await api.put(`/auctions/update-auction/${id}`, {  approved: approved });

    revalidatePath("/dashboard/auctions");
  } catch (error) {
    console.log("FALI to updateStatusAcceptAuction");
  }
}
export async function updateStatusRejectAuction({ id,  rejected, reasonReject } : any) {

  try {

    // const reasonReject = "Buổi đấu giá ko đạt yêu cầu"

    const res = await api.put(`/auctions/update-auction/${id}`, {  rejected: rejected ,reasonReject: reasonReject});

    revalidatePath("/dashboard/auctions");
  } catch (error) {
    console.log("FALI to updateStatusRejectAuction");
  }
}

export async function deleteAuction(params: string) {
  try {
    await api.delete(`/auctions/${params}`);

    revalidatePath("/dashboard/auctions");
  } catch (error) {
    console.log("Fail to delete: ", error);
  }
}

export async function updateAuctionDetail(
  params: string,
  data: IAuctionCreateField
): Promise<void> {
  noStore();
  const url = `/auctions/update-auction/${params}`;

  try {
    await api.put(url, data);

    revalidatePath("/dashboard/auctions");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createAuction(data: IAuctionCreateField): Promise<void> {
  noStore();
  const url = `/auctions/create`;

  try {
    await api.post(url, data);

    revalidatePath("/dashboard/auctions");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function registerAttendAuction(userId: string, auctionId: string) {
  const url = `/auctions/register-by-auctionId/${auctionId}`;

  try {
    const res = await api.post(url, userId);

    if (res.status === 200) {
      console.log('Registration successful');
      revalidatePath(`/auction/${auctionId}`);
      return { success: true, successFull: "Đăng kí đấu giá thành công"};
    } else {
      const errorMessage = res.data.error.errorMessage;
      return { success: false, error: errorMessage };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { response } = error;

      if (response && response.status === 406) {
      
        console.error('Insufficient balance in wallet.');
        return { success: false, error: 'Không đủ xèng trong ví vui lòng nạp tiền nhé' };
      } else if (response && response.status === 400 ) {
        console.error('Auction status is not COMING and user has already registered.');
        return { success: false, error: 'Buổi đấu giá chưa diễn ra!' };
      } else {
        console.error('An unexpected error occurred:', error.message);
        return { success: false, error: 'An unexpected error occurred' };
      }
    } else {
      console.error('An unexpected error occurred:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }
}
