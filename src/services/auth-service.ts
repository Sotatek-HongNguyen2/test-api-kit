import { ServiceBase } from "./core/service-base";
export class AuthServices extends ServiceBase {
  login = async (params: { signature: string }) => {
    return this.post("/auth/login/metamask", params);
  };
}
