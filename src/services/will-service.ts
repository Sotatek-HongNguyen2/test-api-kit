import { SearchParams } from "@/types/global";

import { API_CONFIG } from "./api-config";
import { ServiceBase } from "./core/service-base";
import { UpdateWillBody } from "@/types";

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

  updateWill = async ({willId, ...body}: UpdateWillBody) => {
    const res: any = await this.put(`${API_CONFIG.will.update}/${willId}`, body);
    return res?.data?.data;
  };
}
