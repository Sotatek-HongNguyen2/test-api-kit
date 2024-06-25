import { AxiosRequestConfig } from "axios";

import { ServiceBase } from "./core/service-base";
export class CommonServices extends ServiceBase {

    getListCountries = async () => {
        const configs: AxiosRequestConfig = {
            baseURL: import.meta.env.VITE_BASE_URL_API_COUNTRIES,
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
        return this.getDataByPublicApi(configs);
    };
}

