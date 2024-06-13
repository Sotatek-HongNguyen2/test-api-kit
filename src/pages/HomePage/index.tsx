import { Flex } from "antd";

import { AppButton } from "@/components/atoms/button";
import { WillTabs } from "@/components/organisms/wil-tabs";
// import { PROVIDER_TYPE } from "@/models/contract/evm/contract";
// import { WALLET_INJECT_OBJ } from "@/models/wallet/wallet.abstract";
// import inheritanceWillContract from "@/models/contract/evm/InheritanceWill";
import { useLogout } from "@/hooks/useAuth";

export function HomePage() {
  // const contract = new inheritanceWillContract({
  //   address: "0x698b2F326E4a3e3b9c3F1B6287BabF46F09281ca",
  //   provider: {
  //     type: PROVIDER_TYPE.WALLET,
  //     injectObject: WALLET_INJECT_OBJ.METAMASK,
  //   },
  // });
  const { logout } = useLogout();
  const handleClickLogout = async () => {
    await logout();

    // const res = await contract?.createWill({
    //   nameWill: "PinkCheetah test create Will",
    //   note: "PinkCheetah test create Will",
    //   nickNames: ["PinkCheetah"],
    //   beneficiaries: ["0x698b2F326E4a3e3b9c3F1B6287BabF46F09281ca"],
    //   minRequiredSignatures: 1,
    //   lackOfOutgoingTxRange: 0,
    //   lackOfSignedMsgRange: 1,
    // });
    // const a = { value: "0" };
    // console.log(
    //   await res.send({
    //     from: "0x698b2F326E4a3e3b9c3F1B6287BabF46F09281ca",
    //     gas: "300000",
    //     value: "0",
    //   })
    // );
    // console.log(res);
  };
  return (
    <Flex vertical gap="5vh" className="home-page">
      <WillTabs />
      <AppButton type="primary" onClick={handleClickLogout}>
        Logout
      </AppButton>
    </Flex>
  );
}
