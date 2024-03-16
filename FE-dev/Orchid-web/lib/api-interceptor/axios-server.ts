import { Session } from "next-auth";
import { axiosAuth } from "./api";
import refreshToken from "./refresh-token-server";

const setupAxiosAuth = (session: Session | null) => {
    axiosAuth.interceptors.request.use(
      (config) => {
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
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          
          await refreshToken(session);
          prevRequest.headers["Authorization"] = `Bearer ${session?.user?.access_token}`;
          return axiosAuth(prevRequest);
        }
        return Promise.reject(error);
      }
    );
  };
  
  export default setupAxiosAuth;