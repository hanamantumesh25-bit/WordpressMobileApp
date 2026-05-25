import { API_BASE_URL } from "@utils/constants";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Api-User-Agent": "WordpressMobileApp/1.0 (Expo development app)",
    "User-Agent": "WordpressMobileApp/1.0 (Expo development app)",
  },
});

const handleRequest = async <T>(request: Promise<AxiosResponse<T>>) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const get = <T>(url: string, config?: AxiosRequestConfig) =>
  handleRequest<T>(api.get(url, config));
export const post = <T>(url: string, data: any) =>
  handleRequest<T>(api.post(url, data));
export const put = <T>(url: string, data: any) =>
  handleRequest<T>(api.put(url, data));
export const del = <T>(url: string) => handleRequest<T>(api.delete(url));
