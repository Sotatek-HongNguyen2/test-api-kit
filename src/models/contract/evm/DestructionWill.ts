import DestructionWillAbi from "@/constants/DestructionWill";

import Contract, { InitializeContractType } from "./contract";
import { values } from "lodash";

type ABIType = typeof DestructionWillAbi;

interface CreateWillType {
  nameWill: string;
  assetAddresses: string[];
  lackOfOutgoingTxRange: number;
  lackOfSignedMsgRange: number;
}

export default class destructionWillContract extends Contract<ABIType> {
  constructor({
    address,
    provider,
  }: Omit<InitializeContractType<ABIType>, "contractABI">) {
    super({ address, contractABI: DestructionWillAbi, provider });
  }
  async createWill(dto: CreateWillType) {
    return this.contractInstance.methods.createWill(
      dto.nameWill,
      dto.assetAddresses,
      Number(dto.lackOfOutgoingTxRange),
      // Number(dto.lackOfSignedMsgRange)
    );
  }
}
