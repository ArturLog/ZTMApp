import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fetchData(path: string) {
  try {
    return axios.get(`http://localhost:3000/${path}`)
  } catch (error) {
    console.error(error)
  }
}