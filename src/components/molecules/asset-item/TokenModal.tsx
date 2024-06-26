import { AppInput } from "@/components/atoms/input"
import "./styles.scss"
import { AppButton } from "@/components/atoms/button"
import WillModal from "@/components/atoms/modal"
import { Text } from "@/components/atoms/text"
import { Flex } from "antd"
import { useState } from "react"
import { PROVIDER_TYPE } from "@/models/contract/evm/contract";
import { WALLET_INJECT_OBJ } from "@/models/wallet/wallet.abstract";
import WillToast from "@/components/atoms/ToastMessage";
import willV1Contract from "@/models/contract/evm/willV1Contract";
import { getWalletSlice, useAppSelector } from "@/store";
import { useNavigate, useParams } from "react-router-dom"
import { WillType } from "@/types"
import willV2Contract from "@/models/contract/evm/willV2Contract"

export type TokenModalType = "deposit" | "withdraw";

interface TokenModalProps {
  open: boolean;
  onClose: () => void;
  type: TokenModalType;
  token: any;
  willAddress: string;
}

export const TokenModal = (props: TokenModalProps) => {
  const { open, onClose, type, token, willAddress } = props;
  const [amount, setAmount] = useState<string>("");
  const { address } = useAppSelector(getWalletSlice);
  const { willType } = useParams<{ willType: WillType }>();
  const [loading, setLoading] = useState<boolean>(false);

  const getContract = () => {
    switch (token.value) {
      case "WV1":
        return willV1Contract;
      case "WV2":
        return willV2Contract;
      default:
        return null;
    }
  }

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
      const Contract = getContract();
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
      })
      if (type === "deposit") {
        const tx = await contract.approve({
          address: willAddress, // contract address
          amount,
        });
        const res2 = await tx.send({
          from: address, // my address wallet
        })
        if (res2) {
          onClose();
          setAmount("");
        }
      }
    } catch (error: any) {
      WillToast.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <WillModal
      open={open}
      handleCancel={onClose}
      title={<Text size="text-3xl" className="neutral-1 font-bold capitalize">{type}</Text>}
      hideFooter
    >
      <Flex vertical gap={24}>
        <Flex vertical gap={10}>
          <Text size="text-lg" className="neutral-1 font-semibold">Amount</Text>
          <AppInput
            placeholder="Enter amount"
            suffix={<Text className="font-semibold neutral-1">{token?.value}</Text>}
            type="number"
            value={amount}
            min={1}
            onlyNumber
            onChange={(e) => {
              if (e.target.value === "0") return;
              setAmount(e.target.value)
            }}
          />
        </Flex>
        <Flex align="center" className="uppercase" justify="space-between" gap={20}>
          <AppButton
            size="xl"
            className="token-modal--footer-btn"
            onClick={onClose}>
            <Text size="text-lg" className="uppercase font-bold neutral-1">Cancel</Text>
          </AppButton>
          <AppButton
            type="primary"
            className="token-modal--footer-btn capitalize"
            size="xl"
            onClick={handleSubmit}
            disabled={amount === ""}
            loading={loading}
          >
            <Text size="text-lg" className="uppercase font-bold">{type}</Text>
          </AppButton>
        </Flex>
      </Flex>
    </WillModal>
  )
}