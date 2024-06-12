import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getStorageJwtToken, setStorageJwtToken } from "@/helpers/storage";
import { store } from "@/store";
import { authInstanceSlideActions } from "@/store/slices/authSlides";

export class HttpClient {
  axiosInstance: AxiosInstance;

  constructor() {
    let configs: AxiosRequestConfig = {
      baseURL: import.meta.env.VITE_BASE_URL_API,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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
              `${import.meta.env.VITE_BASE_URL_API}/refresh-token`,
              { refreshToken }
            );
            const newAccessToken = response.data.accessToken;
            store.dispatch(
              authInstanceSlideActions.updateAccessToken(newAccessToken)
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
