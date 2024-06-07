import { ServiceBase } from "./core/service-base";
export class AuthServices extends ServiceBase {
  // Implement method call API
  login = async (params: { walletAddress: string; signature: string }) => {
    console.log("aksdkajshdkahskjdhkjashdjkhasjkhd");
    return this.post("/auth/login", params);
  };
}
