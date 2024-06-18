import { SearchParams } from "@/types/global";

import { API_CONFIG } from "./api-config";
import { ServiceBase } from "./core/service-base";

export class WillServices extends ServiceBase {
  getMyWill = async (params: SearchParams) => {
    const res: any = await this.get(API_CONFIG.will.myWill, params);
    return res?.data?.data;
  };

  getMyInheritedWill = async (params: SearchParams) => {
    const res: any = await this.get(API_CONFIG.will.myInheritedWill, params);
    return res?.data?.data;
  };

  getWillDetail = async ({ willId }: { willId: string }) => {
    const res: any = await this.get(`${API_CONFIG.will.detail}/${willId}`);
    return res?.data?.data;
  };

  saveAsset = async (body: any) => {
    const res: any = await this.post(API_CONFIG.will.saveAsset, body);
    return res?.data?.data;
  };
}
