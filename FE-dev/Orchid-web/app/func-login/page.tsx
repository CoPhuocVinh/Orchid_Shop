"use client";
import useAxiosAuth from "@/lib/api-interceptor/use-axios-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const AppBar = () => {
  const { data: session, status } = useSession();
  //   console.log(session?.user.access_token)

  const axiosAuth = useAxiosAuth();
  const [testData, setTestData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axiosAuth.get(
          "https://orchid.fams.io.vn/api/v1/hello"
        );
        setLoading(true);
        setTestData(res.data);
      } catch (error) {
        console.log("FALI");
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [axiosAuth, status]);

  return (
    <div className="bg-gradient-to-b from-cyan-50 to-cyan-200 p-2 flex gap-5 ">
      <Link href={"/"}>Home</Link>
      {/* <Link href={"/about"}>About</Link> */}
      {/* <Link href={"/server"}>Server</Link> */}
      <div className="ml-auto flex gap-2">
        {session?.user ? (
          <>
            <p className="text-sky-600"> {session.user.name}</p>
            <button className="text-red-500" onClick={() => signOut()}>
              Sign Out
            </button>
          </>
        ) : (
          <button className="text-green-600" onClick={() => signIn()}>
            Sign In
          </button>
        )}
        <button onClick={() => console.log(session)}>session</button>
      </div>
    </div>
  );
};

export default AppBar;
