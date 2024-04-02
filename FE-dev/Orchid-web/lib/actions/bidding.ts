'use server'

import { revalidatePath } from "next/cache";
import { api, axiosAuth } from "../api-interceptor/api";
import axios from "axios";


export async function biddingAuction(userId: string, auctionId: string, biddingPrice: number) {
    const url = `/biddings/bid`;
  
    try {
      const res = await axiosAuth.post(url, {userID: userId, auctionID: auctionId, biddingPrice: biddingPrice});
  
      if (res.status === 200) {
        console.log('Tăng giá thành công');
        revalidatePath(`/auction/${auctionId}`);
        return { success: true};
      } else {
        const errorMessage = res.data.error.errorMessage;
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error;
  
        if (response && response.status === 406) {
          console.error('user must register to bidding');
          return { success: false, error: 'Chưa đăng kí vô buổi đấu giá' };
        } else if (response && response.status === 400) {
          console.error('Bidding price must be greater than the start price.');
          return { success: false, error: 'Hãy tăng giá tiền của bạn' };
        }  else if(response && response.status === 404 ) {
          console.error('Bidding price must be live to bid');
          return { success: false, error: 'Thời gian không thích hợp để đấu giá' };
        }
        else {
          console.error('An unexpected error occurred:', error.message);
          return { success: false, error: 'An unexpected error occurred' };
        }
      } else {
        console.error('An unexpected error occurred:', error);
        return { success: false, error: 'An unexpected error occurred' };
      }
    }
  }