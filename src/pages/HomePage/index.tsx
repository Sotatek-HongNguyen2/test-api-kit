import { Flex } from "antd";
import { ethers } from "ethers";
import SafeApiKit from "@safe-global/api-kit";
import Safe from "@safe-global/protocol-kit";
import {
  MetaTransactionData,
  OperationType,
} from "@safe-global/safe-core-sdk-types";

import { WillTabs } from "@/components/organisms/wil-tabs";
import { PROVIDER_TYPE } from "@/models/contract/evm/contract";
import { WALLET_INJECT_OBJ } from "@/models/wallet/wallet.abstract";
import SafeContract from "@/models/contract/evm/SafeContract";
import SafeAbi from "@/constants/SafeAbi";

export function HomePage() {
  const Test = async () => {
    // const apiKit = new SafeApiKit({
    //   chainId: 11155111n,
    // });

    // const provider = new ethers.providers.Web3Provider(
    //   window.ethereum as any
    // ) as any;
    // const a = await provider.send("eth_requestAccounts", []);

    // // const signer = (await provider.getSigner(a[0])) as any;
    // console.log(a[0], provider);
    // const protocolKitOwner1 = await Safe.init({
    //   provider: provider,
    //   signer: "0xb286BaAeaAe23590d16539652D49F58cA6282b9C",
    //   safeAddress: "0x0E0e097a14Ea275C8DFA1B421bF33EaaEc1E1778",
    // });
    // console.log(protocolKitOwner1);

    const provider = new ethers.providers.Web3Provider(
      window.ethereum as any
    ) as any;

    // Yêu cầu người dùng kết nối ví
    const signer = await provider.send("eth_requestAccounts", []);

    // Khởi tạo Safe
    const protocolKitOwner1 = await Safe.init({
      provider,
      signer: signer[0],
      safeAddress: "0x0E0e097a14Ea275C8DFA1B421bF33EaaEc1E1778",
    });

    console.log(protocolKitOwner1);
  };

  return (
    <Flex vertical gap="5vh" className="home-page">
      <button onClick={Test}>test</button>
      <WillTabs />
    </Flex>
  );
}
