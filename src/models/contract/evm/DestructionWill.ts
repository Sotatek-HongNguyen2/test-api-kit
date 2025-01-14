import DestructionWillAbi from "@/constants/DestructionWill";

import Contract, { InitializeContractType } from "./contract";
import {
  ActivationTriggerType,
  SetWillAssetsType,
  SetWillBeneficiariesType,
} from "./InheritanceWill";

type ABIType = typeof DestructionWillAbi;

interface CreateWillType {
  nameWill: string;
  assetAddresses: string[];
  lackOfOutgoingTxRange: number;
  lackOfSignedMsgRange: number;
}

export interface WithDraw {
  willId: number | string;
  amount: number | string;
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
      Number(dto.lackOfOutgoingTxRange)
      // Number(dto.lackOfSignedMsgRange)
    );
  }
  async setActivationTrigger(dto: ActivationTriggerType) {
    return this.contractInstance.methods.setActivationTrigger(
      dto.willId,
      dto.lackOfOutgoingTxRange
    );
  }

  async setWillAssets(dto: SetWillAssetsType) {
    return this.contractInstance.methods.setWillAssets(dto.willId, dto.assets);
  }

  async setWillBeneficiaries(dto: SetWillBeneficiariesType) {
    return this.contractInstance.methods.setWillBeneficiaries(
      dto.willId,
      dto.nickNames,
      dto.beneficiaries,
      dto.minRequiredSigs
    );
  }

  async withDrawEth(dto: WithDraw) {
    return this.contractInstance.methods.withdrawEthFromWill(
      dto.willId,
      dto.amount
    );
  }
}
