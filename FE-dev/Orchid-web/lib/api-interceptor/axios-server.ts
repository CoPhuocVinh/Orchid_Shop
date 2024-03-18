import { Session } from "next-auth";
import { axiosAuth } from "./api";
import refreshToken from "./refresh-token-server";
import { update, auth } from "../auth";

const setupAxiosAuth = async (session: Session | null) => {
  axiosAuth.interceptors.request.use(
    (config) => {
      if (!config.headers["Authorization"]) {
        config.headers[
          "Authorization"
        ] = `Bearer ${session?.user?.access_token}`;
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
};

export default setupAxiosAuth;
