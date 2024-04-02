import { axiosAuth } from "@/lib/api-interceptor/api";
import React from "react";

const HelloTest = async () => {
  const res = await axiosAuth.get("/hello");

  console.log(res.data);

  return <div>HelloTest</div>;
};

export default HelloTest;
