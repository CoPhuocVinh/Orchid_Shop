"use server";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { IProduct, IProductCreate } from "@/types/dashboard";
import { SearchParams } from "@/types/table";
import {
  ApiListResponse,
  ApiSingleResponse,
  fetchListData,
  fetchSingleData,
} from "@/lib/generics";
import { axiosAuth } from "@/lib/api-interceptor/api";
import { PRODUCTS_URLS } from "./action-key";

export async function getProducts(
  searchParams: SearchParams
): Promise<ApiListResponse<IProduct>> {
  noStore();

  return await fetchListData(PRODUCTS_URLS.GET_PRODUCTS, searchParams);
}

export async function getProductByIDToCreate(
  params: string
): Promise<ApiSingleResponse<IProductCreate>> {
  noStore();

  return await fetchSingleData(PRODUCTS_URLS.GET_PRODUCT_BY_ID(params));
}
export async function getProductByID(
  params: string
): Promise<ApiSingleResponse<IProduct>> {
  noStore();

  return await fetchSingleData(PRODUCTS_URLS.GET_PRODUCT_BY_ID(params));
}

export async function deleteProductByID(params: string): Promise<void> {
  noStore();

  try {
    await axiosAuth.delete(PRODUCTS_URLS.GET_PRODUCT_BY_ID(params));

    revalidatePath("/dashboard/products");
  } catch (error) {
    console.log(error);
    throw error;
  }

  // return await fetchDataByID(url);
}

export async function updateProductDetail(
  params: string,
  data: IProductCreate
): Promise<void> {
  noStore();

  try {
    await axiosAuth.put(PRODUCTS_URLS.GET_PRODUCT_BY_ID(params), data);

    revalidatePath(`/dashboard/products/${params}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateStatusProduct({
  id,
  status,
}: {
  id: number;
  status: string;
}) {
  try {
    await axiosAuth.put(PRODUCTS_URLS.GET_PRODUCT_BY_ID(id), {
      actived: status,
    });

    revalidatePath("/dashboard/products");
  } catch (error) {
    console.log("FALI");
    throw error;
  }
}

export async function createProduct(data: IProductCreate): Promise<void> {
  noStore();

  try {
    await axiosAuth.post(PRODUCTS_URLS.GET_PRODUCTS, data);

    revalidatePath("/dashboard/products");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function checkProductNameExits(
  productName: string
): Promise<boolean> {
  try {
    const res = await axiosAuth.get(`/products?productName=${productName}`);

    return res.data.payload.content.length > 0;
  } catch (error) {
    console.log(error);
    return true;
  }
}
