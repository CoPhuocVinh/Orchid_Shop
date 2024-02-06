"use client";

import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

const TestFucntionPage = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "no have params";

const pageNumber = Number(page)
console.log(typeof pageNumber)
const fallbackPage = isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber

const newSerachParams = new URLSearchParams(searchParams?.toString());

  console.log(pathName);
  console.log(newSerachParams);
  return <div>TestFucntionPage</div>;
};

export default TestFucntionPage;
