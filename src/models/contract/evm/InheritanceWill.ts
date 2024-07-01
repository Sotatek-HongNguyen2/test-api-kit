import InheritanceWillAbi from "@/constants/InheritanceWill";

import Contract, { InitializeContractType } from "./contract";
import { values } from "lodash";

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
}
