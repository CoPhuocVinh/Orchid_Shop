import axios from "axios";

// const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL!;
const baseURL = "https://orchid-be.azurewebsites.net/api/v1";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // to send cookie
});
