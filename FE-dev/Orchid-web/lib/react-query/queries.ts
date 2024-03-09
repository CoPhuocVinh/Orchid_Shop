"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./query-keys";
import {
  getProducts,
  getUserWithRoleCustomer,
  getUserWithRoleStaff,
} from "../actions";
import { SearchParams } from "@/types/table";
import { AuctionStatus, IAuction, IProduct,IUser } from "@/types/dashboard";
import { getAuctions, getAuctionsWithStatus } from "../actions/auction";

// USER
export const useGetStaff = (searchTerm: SearchParams) => {
  return useQuery<{ data: IUser[]; pageCount: number }>({
    queryKey: [QUERY_KEYS.GET_STAFFS, searchTerm],
    queryFn: () => getUserWithRoleStaff(searchTerm),
  });
};

export const useGetUsers = (searchTerm: SearchParams) => {
  return useQuery<{ data: IUser[]; pageCount: number }>({
    queryKey: [QUERY_KEYS.GET_USERS, searchTerm],
    queryFn: () => getUserWithRoleCustomer(searchTerm),
  });
};

//PRODUCT
export const useGetProducts = (searchTerm: SearchParams) => {
  return useQuery<{ data: IProduct[]; pageCount: number }>({
    queryKey: [QUERY_KEYS.GET_PRODUCTS, searchTerm],
    queryFn: () => getProducts(searchTerm),
  });
};




//AUCTION


export const useGetAuctionsWithStatus = (status: AuctionStatus) => {
  return useQuery<{ data: IAuction[]}>({
    queryKey: [QUERY_KEYS.GET_AUCTIONS,status],
    queryFn: () => getAuctionsWithStatus(status),
  });
};



export const useGetTableAuction = () => {
  return useQuery<{ data: IAuction[]}>({
    queryKey: [QUERY_KEYS.GET_TBL_AUCTIONS],
    queryFn: () => getAuctions(),
  });
};