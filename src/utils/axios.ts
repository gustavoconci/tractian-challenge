import axios, { AxiosRequestConfig } from 'axios';

const axiosServices = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

export default axiosServices;

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];
  const res = await axiosServices.get(url, { ...config });
  return res.data;
};