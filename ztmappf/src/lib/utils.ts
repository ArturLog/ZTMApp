import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function fetchData(path: string, options: any = {}) {
  const token = getToken();
  const { method = "GET", data = undefined, headers = {}, ...restOptions } = options;

  const config = {
    method,
    url: `http://localhost:3003/${path}`,
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    data,
    withCredentials: true,
    ...restOptions,
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error("Error in fetchData:", error);
    throw error;
  }
}

export function isTokenExpired(token: string) {
	try {
		const decoded: any = jwtDecode(token);
		const currentTime = Date.now() / 1000; // in seconds
		return decoded.exp < currentTime;
	} catch (error) {
		console.error(error);
		return true;
	}
}

export function getToken() {
	const token = Cookies.get("Authentication");
	if (token && !isTokenExpired(token)) {
		return token;
	}
	Cookies.remove("Authentication");
	return null;
}
