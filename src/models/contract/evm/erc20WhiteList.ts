import erc20WhiteListABI from "@/constants/erc20WhiteList";

import Contract, { InitializeContractType } from "./contract";

type ABIType = typeof erc20WhiteListABI;

export default class erc20WhiteListContract extends Contract<ABIType> {
  constructor({
    address,
    provider,
  }: Omit<InitializeContractType<ABIType>, "contractABI">) {
    super({ address, contractABI: erc20WhiteListABI, provider });
  }
  test() {
    return this.contractInstance.methods.updateWhitelist(
      ["0xAd082CD0eFf5dfCDBBD2a54b5814f83dd17Ac507"],
      true
    );
  }
}
