import axios from "axios";

import refreshToken from "./refresh-token-server";
import { auth, update } from "../auth";

// const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL!;
// const baseURL = process.env.API_URL;
// const baseURL = "http://128.199.185.211:8099/api/v1";
// const baseURL = "https://orchid.fams.io.vn/api/v1/";
// const baseURL = process.env.BASE_URL
const baseURL = "https://orchid-be.azurewebsites.net/api/v1/";

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export const axiosAuth = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: false
});

axiosAuth.interceptors.request.use(
  async (config) => {
    const session = await auth();

    if (!config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${session?.user?.access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const session = await auth();
    const prevRequest = error?.config;
    if (error?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;
      

      const updatedSession = await refreshToken(session);


      const sessionChange = await update({
        user: {
          access_token: updatedSession,
        },
      });


      prevRequest.headers[
        "Authorization"
      ] = `Bearer ${sessionChange?.user?.access_token}`;
      return axiosAuth(prevRequest);
    }
    return Promise.reject(error);
  }
);
