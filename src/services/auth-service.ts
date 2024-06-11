import { API_CONFIG } from "./api-config";
import { ServiceBase } from "./core/service-base";
export class AuthServices extends ServiceBase {
  login = async (params: { signature: string }) => {
    return this.post(API_CONFIG.auth.login, params);
  };
  refreshToken = async (params: { refreshToken: string }) => {
    return this.post(API_CONFIG.auth.refreshToken, params);
  };
  logout = async () => {
    return this.post(API_CONFIG.auth.logout);
  };
}
