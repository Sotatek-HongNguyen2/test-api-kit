import ForwardingWillAbi from "@/constants/ForwardingWill";

import Contract, { InitializeContractType } from "./contract";
import {
  ActivationTriggerType,
  SetWillAssetsType,
  SetWillBeneficiariesType,
} from "./InheritanceWill";

type ABIType = typeof ForwardingWillAbi;

interface CreateWillType {
  nameWill: string;
  note: string;
  nickNames: string[];
  distributions: [string, string[], string[]][];
  minRequiredSignatures: number;
  lackOfOutgoingTxRange: number;
  lackOfSignedMsgRange: number;
}

export interface WithDraw {
  willId: number | string;
  amount: number | string;
}

interface UpdateWillAssetsDistributionType {
  willId: number;
  nickNames: string[];
  distributions: [string, string[], number[]][];
  minRequiredSigs: number;
}

export default class forwardingWillContract extends Contract<ABIType> {
  constructor({
    address,
    provider,
  }: Omit<InitializeContractType<ABIType>, "contractABI">) {
    super({ address, contractABI: ForwardingWillAbi, provider });
  }
  async createWill(dto: CreateWillType) {
    return this.contractInstance.methods.createWill(
      [dto.nameWill, dto.note, dto.nickNames, dto.distributions],
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

  async updateWillAssetsDistribution(dto: UpdateWillAssetsDistributionType) {
    return this.contractInstance.methods.updateWillAssetsDistribution(
      dto.willId,
      dto.nickNames,
      dto.distributions,
      dto.minRequiredSigs
    );
  }
}
