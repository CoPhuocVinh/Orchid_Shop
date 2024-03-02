"use server";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { IProduct, IProductCreate } from "@/types/dashboard";
import { SearchParams } from "@/types/table";
import { fetchListDataWithSearchParam } from "@/lib/generics";
import { api } from "../api-interceptor/api";

let BASE_URL = "https://orchid.fams.io.vn/api/v1";

export async function getProducts(
  searchParams: SearchParams
): Promise<{ data: IProduct[]; pageCount: number }> {
  noStore();
  const url = `/products`;

  return await fetchListDataWithSearchParam(url, searchParams);
}

export async function getProductByID(
  params: string
): Promise<{ data: IProductCreate | null }> {
  noStore();
  const url = `/products/${params}`;

  try {
    const res = await api.get(url);

    return { data: res.data.payload };
  } catch (error) {
    return { data: null };
  }

  // return await fetchDataByID(url);
}

export async function deleteProductByID(params: string): Promise<void> {
  noStore();
  const url = `/products/${params}`;

  try {
    await api.delete(url);

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
  const url = `/products/${params}`;

  try {
    await api.put(url, data);

    revalidatePath("/dashboard/products");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createProduct(data: IProductCreate): Promise<void> {
  noStore();
  const url = `/products`;

  try {
    await api.post(url, data);

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
    const res = await api.get(`/products?productName=${productName}`);

    return res.data.payload.content.length > 0;
  } catch (error) {
    console.log(error);
    return true;
  }
}
