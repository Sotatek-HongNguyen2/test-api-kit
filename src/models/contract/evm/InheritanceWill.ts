import InheritanceWillAbi from "@/constants/InheritanceWill";

import Contract, { InitializeContractType } from "./contract";

type ABIType = typeof InheritanceWillAbi;

interface CreateWillType {
  nameWill: string;
  note: string;
  nickNames: string[];
  beneficiaries: string[];
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
  createWill(dto: CreateWillType) {
    return this.contractInstance.methods.createWill(
      {
        name: dto.nameWill,
        note: dto.note,
        nickNames: dto.nickNames,
        beneficiaries: dto.beneficiaries,
      },
      {
        minRequiredSignatures: dto.minRequiredSignatures,
        lackOfOutgoingTxRange: dto.lackOfOutgoingTxRange,
        lackOfSignedMsgRange: dto.lackOfSignedMsgRange,
      }
    );
  }
}
