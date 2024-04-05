"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./query-keys";
import {
  getOrderId,
  getOrdersByUserId,
  getProducts,
  getUserAddressInfo,
  getUserWithRoleCustomer,
  getUserWithRoleStaff,
} from "../actions";
import { SearchParams } from "@/types/table";
import {
  AuctionStatus,
  IAuction,
  IOrder,
  IProduct,
  IUser,
  IWallet,
} from "@/types/dashboard";
import { getAuctions, getAuctionsWithStatus } from  "@/lib/actions";
import { getWalletByUserId } from "@/lib/actions";
import { ApiListResponse, ApiSingleResponse, } from "@/lib/generics";

// USER
export const useGetStaff = (searchTerm: SearchParams) => {
  return useQuery<ApiListResponse<IUser>>({
    queryKey: [QUERY_KEYS.GET_STAFFS, searchTerm],
    queryFn: () => getUserWithRoleStaff(searchTerm),
  });
};

export const useGetUsers = (searchTerm: SearchParams) => {
  return useQuery<ApiListResponse<IUser>>({
    queryKey: [QUERY_KEYS.GET_USERS, searchTerm],
    queryFn: () => getUserWithRoleCustomer(searchTerm),
  });
};

export const useGetAddress = (params: string) => {
  return useQuery<{ data: any }>({
    queryKey: [QUERY_KEYS.GET_USERS, params],
    queryFn: () => getUserAddressInfo(params),
  });
};

//PRODUCT
export const useGetProducts = (searchTerm: SearchParams) => {
  return useQuery<ApiListResponse<IProduct>>({
    queryKey: [QUERY_KEYS.GET_PRODUCTS, searchTerm],
    queryFn: () => getProducts(searchTerm),
  });
};

//AUCTION

export const useGetAuctionsWithStatus = (status: AuctionStatus) => {
  return useQuery<ApiListResponse<IAuction>>({
    queryKey: [QUERY_KEYS.GET_AUCTIONS, status],
    queryFn: () => getAuctionsWithStatus(status),
  });
};

export const useGetTableAuction = () => {
  return useQuery<ApiListResponse<IAuction>>({
    queryKey: [QUERY_KEYS.GET_TBL_AUCTIONS],
    queryFn: () => getAuctions(),
  });
};

// WALLET
export const useGetWallet = (params: string) => {
  return useQuery<ApiSingleResponse<IWallet>>({
    queryKey: [QUERY_KEYS.GET_WALLET, params],
    queryFn: () => getWalletByUserId(params),
  });
};

//ORDER
export const useGetOrderByUserId = (
  searchTerm: SearchParams,
  userId: string
) => {
  return useQuery<ApiListResponse<IOrder>>({
    queryKey: [QUERY_KEYS.GET_ORDERS, searchTerm, userId],
    queryFn: () => getOrdersByUserId(searchTerm, userId),
  });
};
