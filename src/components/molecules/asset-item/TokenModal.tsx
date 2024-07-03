import { AppInput } from "@/components/atoms/input";
import "./styles.scss";
import { AppButton } from "@/components/atoms/button";
import WillModal from "@/components/atoms/modal";
import { Text } from "@/components/atoms/text";
import { Flex } from "antd";
import { useState } from "react";
import { PROVIDER_TYPE } from "@/models/contract/evm/contract";
import { WALLET_INJECT_OBJ } from "@/models/wallet/wallet.abstract";
import WillToast from "@/components/atoms/ToastMessage";
import willV1Contract from "@/models/contract/evm/willV1Contract";
import { getWalletSlice, useAppSelector } from "@/store";
import { useParams } from "react-router-dom";
import { TokenWillType, WillType } from "@/types";
import willV2Contract from "@/models/contract/evm/willV2Contract";
import { ethers } from "ethers";
import { getWeb3Instance } from "@/helpers/evmHandlers";
import { ETH_CHAIN_ID } from "@/const/envs";

export type TokenModalType = "deposit" | "withdraw" | "approve";

interface TokenModalProps {
  open: boolean;
  onClose: () => void;
  type: TokenModalType;
  token: any;
  willAddress: string;
  willType?: WillType;
}

export const getTokenContract = (token: TokenWillType) => {
  switch (token) {
    case "USDC":
      return willV1Contract;
    case "WV2":
      return willV2Contract;
    default:
      return null;
  }
};

export const TokenModal = (props: TokenModalProps) => {
  const {
    open,
    onClose,
    type,
    token,
    willAddress,
    willType: willTypeProp,
  } = props;
  const [amount, setAmount] = useState<string>("");
  const { address } = useAppSelector(getWalletSlice);
  const { willType: willTypeParam } = useParams<{ willType: WillType }>();
  const willType = willTypeParam || willTypeProp;
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!willType || !willAddress) {
        WillToast.error("Something went wrong, please try again later");
        return;
      }
      if (!address) {
        WillToast.error("Please connect your wallet first!");
        return;
      }
      let res2 = null;
      if (type === "approve") {
        const Contract = getTokenContract(token.value);
        if (!Contract) {
          WillToast.error("Something went wrong, please try again later");
          return;
        }

        const contract = new Contract({
          address: token?.assetAddress, // token address
          provider: {
            type: PROVIDER_TYPE.WALLET,
            injectObject: WALLET_INJECT_OBJ.METAMASK,
          },
        });
        const tx = await contract.approve({
          address: willAddress.toString(),
          amount: amount,
        });
        res2 = await tx.send({
          from: address,
        });

        if (res2.transactionHash) {
          WillToast.success("Approve success!");
        }
      } else if (type === "deposit") {
        if (!window.ethereum) {
          WillToast.error("Please connect your wallet first");
          return;
        }
        const web3 = getWeb3Instance({
          type: PROVIDER_TYPE.WALLET,
          injectObject: WALLET_INJECT_OBJ.METAMASK,
        });

        const nonce = await web3.eth.getTransactionCount(address, "latest");
        const tx = {
          from: address,
          to: willAddress,
          value: web3.utils.toWei(amount, "ether"),
          gas: "300000",
          nonce: nonce,
          chainId: ETH_CHAIN_ID,
        };

        // console.log(tx);
        const transactionHash = await web3.eth.sendTransaction(tx);
        if (transactionHash.transactionHash) {
          WillToast.success("Deposit success!");
        }
        onClose();
        // await tx.wait();
      }
      if (res2) {
        onClose();
        setAmount("");
      }
    } catch (error: any) {
      WillToast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <WillModal
      open={open}
      handleCancel={onClose}
      title={
        <Text size="text-3xl" className="neutral-1 font-bold capitalize">
          {type}
        </Text>
      }
      hideFooter
    >
      <Flex vertical gap={24}>
        <Flex vertical gap={10}>
          <Text size="text-lg" className="neutral-1 font-semibold">
            Amount
          </Text>
          <AppInput
            placeholder="Enter amount"
            suffix={
              <Text className="font-semibold neutral-1">{token?.value}</Text>
            }
            type="number"
            value={amount}
            min={1}
            onChange={(e) => {
              // if (e.target.value === "0") return;
              setAmount(e.target.value);
            }}
          />
        </Flex>
        <Flex
          align="center"
          className="uppercase"
          justify="space-between"
          gap={20}
        >
          <AppButton
            size="xl"
            className="token-modal--footer-btn"
            onClick={onClose}
          >
            <Text size="text-lg" className="uppercase font-bold neutral-1">
              Cancel
            </Text>
          </AppButton>
          <AppButton
            type="primary"
            className="token-modal--footer-btn capitalize"
            size="xl"
            onClick={handleSubmit}
            disabled={amount === ""}
            loading={loading}
          >
            <Text size="text-lg" className="uppercase font-bold">
              {type}
            </Text>
          </AppButton>
        </Flex>
      </Flex>
    </WillModal>
  );
};
