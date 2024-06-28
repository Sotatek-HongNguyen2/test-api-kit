import { Flex, Image } from "antd";

import { WillTabs } from "@/components/organisms/wil-tabs";
import { useAppDispatch } from "@/store";
import { walletSliceActions } from "@/store/slices/walletSlice";
import WALLETS from "@/models/wallet";

import QRCode from "qrcode";
import { useState } from "react";

export function HomePage() {
  const dispatch = useAppDispatch();
  const { createNewAccount } = walletSliceActions;
  const [image, setImage] = useState<string>();

  const test = async () => {
    const res = (await dispatch(
      createNewAccount({ wallet: WALLETS.metamask })
    )) as any;
    console.log(res);
    const base64 = await QRCode.toDataURL(res.payload.privateKey);
    setImage(base64);
  };
  return (
    <Flex vertical gap="5vh" className="home-page">
      <button onClick={test}>test</button>
      <Image width={400} src={image}></Image>
      <WillTabs />
    </Flex>
  );
}
