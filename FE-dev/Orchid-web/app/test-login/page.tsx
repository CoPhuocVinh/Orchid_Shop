"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import apiAuth from "@/lib/api-interceptor/api";
import React, { useEffect, useState } from "react";

const LoginForm = () => {
  const { login, logout, user, metaData } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [test, setTest] = useState();
  // useEffect(() => {
  //   const fetchData= async () => {
  //       const res = await apiAuth.get("https://orchid.fams.io.vn/api/v1/products")

  //       setTest(res.data)
  //   }

  //   fetchData()
  // },[])

  //   console.log(user)
  //   console.log(metaData)
  // const handleLogin = async (e: any) => {
  //   e.preventDefault();
  //   try {
  //     await login(email, password);

  //   } catch (error) {
  //     console.error('Login failed:', error);
  //   }
  // };

  // const handleLogout = async () => {
  //   logout();
  //   console.log("LOG")
  // }

  return (
    <>
{/*     
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form> */}

      {/* <Button onClick={handleLogout}>LOUGOUT</Button> */}

      test
    </>
  );
};

export default LoginForm;
