"use client";

import axios from "axios";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { IProduct } from "@/types/dashboard";
import { QUERY_KEYS } from "@/lib/react-query/query-keys";
import { SearchParams } from "@/types/table";
import { getProducts } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";

export interface IndexPageProps {
  searchParams: SearchParams;
}
const TestFucntionPage = ({ searchParams }: IndexPageProps) => {
  // const pathName = usePathname();
  // const searchParams = useSearchParams();
  // const page = searchParams.get("page") ?? "no have params";

  // const pageNumber = Number(page);
  // console.log(typeof pageNumber);
  // const fallbackPage = isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber;

  // const newSerachParams = new URLSearchParams(searchParams?.toString());

  // console.log(pathName);
  // console.log(newSerachParams);
  const initialDate = new Date(Date.now());

  // const year = initialDate.getFullYear();
  // const month = String(initialDate.getMonth() + 1).padStart(2, '0');
  // const day = String(initialDate.getDate()).padStart(2, '0');
  // const hours = String(initialDate.getHours()).padStart(2, '0');
  // const minutes = String(initialDate.getMinutes()).padStart(2, '0');
  // const seconds = String(initialDate.getSeconds()).padStart(2, '0');

  // const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

  // console.log(formattedDate);

  // const initialDate = moment();

  // const formattedDate = initialDate.format("YYYY-MM-DDTHH:mm:ss");

  console.log(initialDate);
  // const [products, setProducts] = useState<any>([]);
  // useEffect(() => {
  //   const fetchPro = async () => {
  //     const res = await axios.get(
  //       "https://orchid-be.azurewebsites.net/api/v1/products?categoryId=1.2"
  //     );

  //     console.log(res.data.payload);
  //   };

  //   fetchPro();
  // }, []);
  // console.log(searchParams);
  // const { data, isLoading } = useQuery<{ data: IProduct[]; pageCount: number }>(
  //   {
  //     queryKey: [QUERY_KEYS.GET_PRODUCTS],
  //     queryFn: () => getProducts(searchParams),
  //   }
  // );
  // if (isLoading) return <div>...Loading</div>;
  // console.log(data);


 

  return (
    <div>
      <h1>TestFucntionPage</h1>
    </div>
  );
};

export default TestFucntionPage;
