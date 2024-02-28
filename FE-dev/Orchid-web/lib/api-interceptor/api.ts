import { MetaData } from "@/context/auth-context";
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosRequestHeaders,
} from "axios";
// const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL!;
// const baseURL = process.env.API_URL;
// const baseURL = "http://128.199.185.211:8099/api/v1";
const baseURL = "https://orchid.fams.io.vn/api/v1/";



export const api = axios.create({
  baseURL,
});


let metadata: MetaData | null = null;

if (typeof window !== 'undefined') {
  metadata = localStorage.getItem('metadata') ? JSON.parse(localStorage.getItem('metadata')!) : null;
}
// if (typeof window !== 'undefined') {
//   const storedMetadata = localStorage.getItem('metadata');
//   console.log('Stored metadata:', storedMetadata);
//   metadata = storedMetadata ? JSON.parse(storedMetadata) : null;
//   console.log('Parsed metadata:', metadata);
// }


const apiAuth = axios.create({
  baseURL,
  headers: metadata ? { Authorization: `Bearer ${metadata.access_token}` } : {}
});

apiAuth.interceptors.request.use(
  async (config: any) => {

    const accessToken = metadata?.access_token;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);



apiAuth.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const request = error.config;

    // implement refresh token

    return Promise.reject(error);
  }
);

export default apiAuth;
