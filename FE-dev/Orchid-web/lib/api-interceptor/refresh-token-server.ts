import { Session } from "next-auth";
import { api } from "./api";

const refreshToken = async (session: Session | null) => {
  console.log(session);
  try {
    // Gửi yêu cầu refresh token đến máy chủ
    const refreshTokenResponse = await api.post("/auth/refreshToken", {
      refreshToken: session?.user.refresh_token,
    });

    //  const updateRefreshToken = await update({
    //     user: {
    //       access_token: refreshTokenResponse.data.metadata.access_token
    //     }
    //   })

    //   const sessionUpdate =   updateRefreshToken?.user.access_token

    const newAccessToken = refreshTokenResponse.data.metadata.access_token;
    // console.log(newAccessToken);
    return newAccessToken;

    // return sessionUpdate;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error;
  }
};

export default refreshToken;
