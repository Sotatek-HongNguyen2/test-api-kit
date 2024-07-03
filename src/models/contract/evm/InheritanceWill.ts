import InheritanceWillAbi from "@/constants/InheritanceWill";

import Contract, { InitializeContractType } from "./contract";
// import { values } from "lodash";

type ABIType = typeof InheritanceWillAbi;

interface CreateWillType {
  nameWill: string;
  note: string;
  nickNames: string[];
  beneficiaries: string[];
  assets: string[];
  minRequiredSignatures: number;
  lackOfOutgoingTxRange: number;
  lackOfSignedMsgRange: number;
}

interface UpdateWillType {
  willId: number;
}

export interface ActivationTriggerType extends UpdateWillType {
  lackOfOutgoingTxRange: number;
}

export interface SetWillAssetsType extends UpdateWillType {
  assets: string[];
}

export interface SetWillBeneficiariesType extends UpdateWillType {
  nickNames: string[];
  beneficiaries: string[];
  minRequiredSigs: number;
}
export interface WithDraw {
  willId: number | string;
  amount: number | string;
}

export default class inheritanceWillContract extends Contract<ABIType> {
  constructor({
    address,
    provider,
  }: Omit<InitializeContractType<ABIType>, "contractABI">) {
    super({ address, contractABI: InheritanceWillAbi, provider });
  }
  async createWill(dto: CreateWillType) {
    return this.contractInstance.methods.createWill(
      [dto.nameWill, dto.note, dto.nickNames, dto.beneficiaries, dto.assets],
      [
        Number(dto.minRequiredSignatures),
        Number(dto.lackOfOutgoingTxRange),
        // Number(dto.lackOfSignedMsgRange),
      ]
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
