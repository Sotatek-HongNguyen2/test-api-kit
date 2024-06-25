import Contract, { InitializeContractType } from "./contract";
import willV2 from "@/constants/willV2";

type ABIType = typeof willV2;


export default class willV2Contract extends Contract<ABIType> {
  constructor({
    address,
    provider,
  }: Omit<InitializeContractType<ABIType>, "contractABI">) {
    super({ address, contractABI: willV2, provider });
  }
  async approve(dto: { address: string, amount: string }) {
    return this.contractInstance.methods.approve(
      [dto.address],
      [dto.amount]
    )
  }
}
