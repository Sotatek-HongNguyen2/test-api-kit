import ForwardingWillAbi from "@/constants/ForwardingWill";

import Contract, { InitializeContractType } from "./contract";

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
}
