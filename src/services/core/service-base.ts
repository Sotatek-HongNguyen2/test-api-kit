import { AxiosResponse } from "axios";

import WillToast from "@/components/atoms/ToastMessage";

import { HttpClient } from "./http-service";

interface Dict<T> {
  [key: string]: T;
  [key: number]: T;
}

interface DataResult {
  data: any;
  // metadata: any;
}

export interface ChangeListener {
  (event: any): any;
}

export class ServiceBase extends HttpClient {
  private onChangeListeners: Dict<ChangeListener> = {};
  getDataResult = (response: AxiosResponse) => {
    const data = response;
    // const metadata = response.data?.metadata;
    return { data };
  };

  get = async (url: string, params?: any): Promise<DataResult> => {
    try {
      const response = await this.axiosInstance.get(url, { params });
      return this.getDataResult(response);
    } catch (error: any) {
      WillToast.error(error.message);
      return {
        data: error,
      };
    }
  };

  put = async (url: string, data: any): Promise<DataResult> => {
    try {
      const response = await this.axiosInstance.put(url, data);
      return this.getDataResult(response);
    } catch (error: any) {
      WillToast.error(error.message);
      return {
        data: error,
      };
    }
  };

  patch = async (url: string, data: any): Promise<DataResult> => {
    try {
      const response = await this.axiosInstance.patch(url, data);
      return this.getDataResult(response);
    } catch (error: any) {
      WillToast.error(error.message);
      return {
        data: error,
      };
    }
  };

  post = async (url: string, params?: any): Promise<DataResult> => {
    try {
      const response = await this.axiosInstance.post(url, params && params);
      return this.getDataResult(response);
    } catch (error: any) {
      WillToast.error(error.message);
      return {
        data: error,
      };
    }
  };

  delete = async (url: string, id: number): Promise<DataResult> => {
    try {
      const response = await this.axiosInstance.delete(`${url}/${id}`);
      return this.getDataResult(response);
    } catch (error: any) {
      WillToast.error(error.message);
      return {
        data: error,
      };
    }
  };

  deleteByUrl = async (url: string): Promise<DataResult> => {
    try {
      const response = await this.axiosInstance.delete(url);
      return this.getDataResult(response);
    } catch (error: any) {
      WillToast.error(error.message);
      return {
        data: error,
      };
    }
  };

  update = async (
    url: string,
    id: number | undefined,
    params: any
  ): Promise<DataResult> => {
    try {
      const response = await this.axiosInstance.patch(`${url}/${id}`, params);
      return this.getDataResult(response);
    } catch (error: any) {
      WillToast.error(error.message);
      return {
        data: error,
      };
    }
  };

  subscribe(key: string, listener: ChangeListener) {
    if (this.onChangeListeners[key]) return;
    this.onChangeListeners[key] = listener;
  }

  unsubcribe(key: string) {
    delete this.onChangeListeners[key];
  }

  fire(data: any) {
    Object.values(this.onChangeListeners).forEach((listener) => listener(data));
  }
  getDataByPublicApi = async (config: any) => {
    try {
      const response = await this.axiosInstance.request(config);
      return response;
    } catch (error: any) {
      WillToast.error(error.message);
      return {
        data: error,
      };
    }
  }
}
