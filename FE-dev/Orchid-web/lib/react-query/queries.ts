import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./query-keys";
import {
  getProducts,
  getUserWithRoleCustomer,
  getUserWithRoleStaff,
} from "../actions";
import { SearchParams } from "@/types/table";

// USER
export const useGetStaff = (searchTerm: SearchParams) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_STAFFS, searchTerm],
    queryFn: () => getUserWithRoleStaff(searchTerm),
    //   enabled: !!searchTerm,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetUsers = (searchTerm: SearchParams) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USERS, searchTerm],
    queryFn: () => getUserWithRoleCustomer(searchTerm),
    //   enabled: !!searchTerm,
    staleTime: 5 * 60 * 1000,
  });
};

//PRODUCT
export const useGetProducts = (searchTerm: SearchParams) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PRODUCTS, searchTerm],
    queryFn: () => getProducts(searchTerm),
    //   enabled: !!searchTerm,
    staleTime: 5 * 60 * 1000,
  });
};
