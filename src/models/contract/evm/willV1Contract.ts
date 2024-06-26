import Contract, { InitializeContractType } from "./contract";
import willV1 from "@/constants/willV1";

type ABIType = typeof willV1;

export default class willV1Contract extends Contract<ABIType> {
  constructor({
    address,
    provider,
  }: Omit<InitializeContractType<ABIType>, "contractABI">) {
    super({ address, contractABI: willV1, provider });
  }
  async approve(dto: { address: string; amount: string }) {
    return this.contractInstance.methods.approve(dto.address, dto.amount);
  }
}
