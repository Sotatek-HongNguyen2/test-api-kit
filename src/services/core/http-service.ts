import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getStorageJwtToken } from "@/helpers/storage";

export class HttpClient {
  axiosInstance: AxiosInstance;

  constructor() {
    const tokenAccess = getStorageJwtToken();
    let configs: AxiosRequestConfig = {
      baseURL: import.meta.env.VITE_BASE_URL_API,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + tokenAccess,
      },
      timeout: 5000,
      transformRequest: [
        (data, headers) => {
          if (data instanceof FormData) {
            if (headers) {
              delete headers["Content-Type"];
            }
            return data;
          }
          return JSON.stringify(data);
        },
      ],
    };

    this.axiosInstance = axios.create(configs);

    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error?.response?.status === 401) {
          // removeStorageJwtToken();
          // return window.location.reload();
          // return window.location.replace(window.location.origin);
        }
        return Promise.reject(error);
      }
    );
  }
}
