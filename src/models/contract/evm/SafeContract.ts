import SafeAbi from "@/constants/SafeAbi";

import Contract, { InitializeContractType } from "./contract";

type ABIType = typeof SafeAbi;

export default class SafeContract extends Contract<ABIType> {
  constructor({
    address,
    provider,
  }: Omit<InitializeContractType<ABIType>, "contractABI">) {
    super({ address, contractABI: SafeAbi, provider });
  }
  async setGuard(dto: { address: string }) {
    return this.contractInstance.methods.setGuard(dto.address);
  }
  async execTransaction(dto: {
    to: string;
    value: number;
    data: string;
    operation: any;
    safeTxGas: number;
    baseGas: number;
    gasPrice: number;
    gasToken: string;
    refundReceiver: string;
    signatures: string;
  }) {
    return this.contractInstance.methods.execTransaction(
      dto.to,
      dto.value,
      dto.data,
      dto.operation,
      dto.safeTxGas,
      dto.baseGas,
      dto.gasPrice,
      dto.gasToken,
      dto.refundReceiver,
      dto.signatures
    );
  }
  async getOwners() {
    return this.contractInstance.methods.getOwners();
  }
}
