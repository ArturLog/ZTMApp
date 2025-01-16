"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchData, getToken } from "@/lib/utils";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

export function AuthProvider({ children } : { children: any }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const checkAuth = async () => {
    try {
      const token = getToken();
      if (token) {
        const response = await fetchData("auth/current");
        if (response && response.data) {
          setIsLoggedIn(true);
          setUser(response.data);
          return;
        }
      }
      setIsLoggedIn(false);
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Failed to verify authentication:", error);
      setIsLoggedIn(false);
      setUser(null);
      router.push("/");
    }
  };

  const login = async (email : string, password : string) => {
    try {
      const response = await fetchData("auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        data: JSON.stringify({ email, password }),
      });
      Cookies.set("Authentication", response.data.access_token, { expires: 1 });
      setIsLoggedIn(true);
      setUser(response.data.user);
      return response.data.user;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove("Authentication");
    setIsLoggedIn(false);
    setUser(null);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
