import axios from "axios";
import { Session } from "next-auth";

const refreshToken = async (session: Session | null) => {
  console.log(session);
  try {
    // Gửi yêu cầu refresh token đến máy chủ 
    const refreshTokenResponse = await axios.post("/auth/refreshToken", {
      refreshToken: session?.user.refresh_token,
    });

    // Lấy token truy cập mới từ phản hồi
    const newAccessToken = refreshTokenResponse.data.metadata.access_token;

    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error;
  }
};

export default refreshToken;
