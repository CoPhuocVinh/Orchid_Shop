"use client";

import { signIn, useSession } from "next-auth/react";
import { api } from "./api";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await api.post("/auth/refreshToken", {
        refreshToken: session?.user.refresh_token,
    });

    if (session) session.user.access_token = res.data.metadata.access_token;
    else signIn();
  };
  return refreshToken;
};