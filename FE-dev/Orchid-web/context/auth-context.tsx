"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";
// import { toast } from "react-toastify";

export type User = {
  id: string;
  name: string;
  email: string;
  img: string;
  dob: string;
  role: "STAFF" | "ADMIN" | "CUSTOMER";
};

export type MetaData = {
  access_token: string;
  refresh_token: string;
  tokenType: string;
};

type AuthContextType = {
  user: User | null;
  metaData: MetaData | null;
  setMetaData: any;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [metaData, setMetaData] = useState<MetaData | null>(() => {
    if (typeof window !== "undefined") {
      const metaData = window.localStorage.getItem("metadata");
      return metaData ? JSON.parse(metaData) : null;
    }

    return null;
  });
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const user = window.localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    }
    return null;
  });

  const router = useRouter();
  const login = async (email: string, password: string) => {

    try {
      const response = await fetch(
        "https://orchid.fams.io.vn/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (response.ok) {
        const res = await response.json();

        setUser(res.payload);
        setMetaData(res.metadata);

        if (typeof window !== "undefined") {
          window.localStorage.setItem("user", JSON.stringify(res.payload));
          window.localStorage.setItem("metadata", JSON.stringify(res.metadata));
        }
        // toast.success("Đăng nhập thành công")
        // router.push("/");
      } else {
        console.log("Login failed. Please check your credentials.");
        // toast.error("Đăng nhập thất bại")
      }
    } catch (error) {
      console.log(error);
      // toast.error("Đăng nhập thất bại")
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      setMetaData(null);
      setUser(null);
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("metadata");
    }
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, user, metaData, setMetaData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
