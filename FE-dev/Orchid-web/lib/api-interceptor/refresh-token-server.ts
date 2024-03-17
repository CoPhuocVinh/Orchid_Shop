import axios from 'axios';
import { auth } from '../auth';
import { Session } from 'next-auth';

const refreshToken = async (session: Session | null) => {
  
    console.log(session)
  try {
    // Gửi yêu cầu refresh token đến máy chủ của bạn
    const refreshTokenResponse = await axios.post('/auth/refreshToken', {
        refreshToken: session?.user.refresh_token,
    });

    // Lấy token truy cập mới từ phản hồi
    const newAccessToken = refreshTokenResponse.data.metadata.access_token;

    return newAccessToken;
  } catch (error) {
    // Xử lý lỗi khi refresh token
    console.error('Failed to refresh token:', error);
    throw error;
  }
};

export default refreshToken;