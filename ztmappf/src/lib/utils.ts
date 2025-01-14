import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function fetchData(path: string) {
	try {
		return axios.get(`http://localhost:3001/${path}`);
	} catch (error) {
		console.error(error);
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
