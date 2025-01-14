import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import { store } from "@/store";
import { authInstanceSlideActions } from "@/store/slices/authSlides";

import { API_CONFIG } from "../api-config";

export class HttpClient {
  axiosInstance: AxiosInstance;

  constructor() {
    const configs: AxiosRequestConfig = {
      baseURL: import.meta.env.VITE_BASE_URL_API,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 10000,
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

    this.axiosInstance.interceptors.request.use(
      (config) => {
        const accessToken = store.getState().authSlides.accessToken;
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        if (error?.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = store.getState().authSlides.refreshToken;
            const response = await axios.post(
              `${import.meta.env.VITE_BASE_URL_API}${
                API_CONFIG.auth.refreshToken
              }`,
              { refreshToken }
            );
            const newAccessToken = response.data.accessToken;
            const newRefreshToken = response.data.refreshToken;
            store.dispatch(
              authInstanceSlideActions.updateAccessToken(newAccessToken)
            );
            store.dispatch(
              authInstanceSlideActions.updateRefreshToken(newRefreshToken)
            );
            this.axiosInstance.defaults.headers["Authorization"] =
              "Bearer " + newAccessToken;
            originalRequest.headers["Authorization"] =
              "Bearer " + newAccessToken;
            return this.axiosInstance(originalRequest);
          } catch (error) {
            store.dispatch(authInstanceSlideActions.deleteAuth());
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );
  }
}
