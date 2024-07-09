import { AppInput } from "@/components/atoms/input";
import "./styles.scss";
import { AppButton } from "@/components/atoms/button";
import WillModal from "@/components/atoms/modal";
import { Text } from "@/components/atoms/text";

import { Flex } from "antd";
import { useEffect, useState } from "react";

import Contract, { PROVIDER_TYPE } from "@/models/contract/evm/contract";
import { WALLET_INJECT_OBJ } from "@/models/wallet/wallet.abstract";
import WillToast from "@/components/atoms/ToastMessage";
import { getBalanceSlide, getWalletSlice, useAppSelector } from "@/store";

import { useParams } from "react-router-dom";

import { TOKEN_LIST, TokenWillType, WillType } from "@/types";
import { getWeb3Instance } from "@/helpers/evmHandlers";
import { ETH_CHAIN_ID } from "@/const/envs";
import inheritanceWillContract from "@/models/contract/evm/InheritanceWill";
import forwardingWillContract from "@/models/contract/evm/ForwardingWill";
import destructionWillContract from "@/models/contract/evm/DestructionWill";
import { formWei } from "@/helpers/common";

import { ethers } from "ethers";

export type TokenModalType = "deposit" | "withdraw" | "approve";

interface TokenModalProps {
  open: boolean;
  onClose: () => void;
  type: TokenModalType;
  token: any;
  willAddress: string;
  willType?: WillType;
  scWillId?: string | undefined;
  successSend?: (amount: string | undefined) => void;
}

export const getTokenContract = (token: TokenWillType) => {
  switch (token) {
    case TOKEN_LIST.USDC.NAME:
      return TOKEN_LIST.USDC.ABI;
    case TOKEN_LIST.DAI.NAME:
      return TOKEN_LIST.DAI.ABI;
    default:
      return null;
  }
};

export const getWillContract = (willType: WillType) => {
  switch (willType) {
    case "inheritance":
      return inheritanceWillContract;
    case "forwarding":
      return forwardingWillContract;
    case "destruction":
      return destructionWillContract;
    default:
      return null;
  }
};

export const contractAddress = (willType: WillType) => {
  switch (willType) {
    case "inheritance":
      return import.meta.env.VITE_INHERITANCE_ROUTER;
    case "forwarding":
      return import.meta.env.VITE_FORWARDING_ROUTER;
    default: // destruction
      return import.meta.env.VITE_DESTRUCTION_ROUTER;
  }
};

export const TokenModal = (props: TokenModalProps) => {
  const {
    open,
    onClose,
    type,
    token,
    willAddress,
    scWillId,
    willType: willTypeProp,
    successSend,
  } = props;
  const [amount, setAmount] = useState<string>("");
  const { address } = useAppSelector(getWalletSlice);
  const { willType: willTypeParam } = useParams<{ willType: WillType }>();
  const willType = willTypeParam || willTypeProp;
  const [loading, setLoading] = useState<boolean>(false);
  const { listBalances } = useAppSelector(getBalanceSlide);
  const [decimal, setDecimal] = useState<string | number>();

  const handleSubmit = async () => {
    const Contract = getWillContract(willType as WillType);

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
          amount: ethers.utils
            .parseUnits(amount.toString(), decimal)
            .toString(),
        });
        res2 = (await tx.send({
          from: address,
        })) as any;

        if (res2.transactionHash) {
          WillToast.success("Approve success!");

          if (successSend) {
            successSend(
              formWei(res2.events.Approval.returnValues.value, `${decimal}`)
            );
          }
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

        const transactionHash = (await web3.eth.sendTransaction(tx)) as any;
        if (transactionHash.transactionHash) {
          WillToast.success("Deposit success!");
          if (successSend) {
            successSend(formWei(amount, `${decimal}`));
          }
        }
        onClose();
      } else if (type === "withdraw") {
        const addressData = contractAddress(willType as WillType);

        if (Contract) {
          const contract = new Contract({
            address: addressData,
            provider: {
              type: PROVIDER_TYPE.WALLET,
              injectObject: WALLET_INJECT_OBJ.METAMASK,
            },
          });
          const web3 = getWeb3Instance({
            type: PROVIDER_TYPE.WALLET,
            injectObject: WALLET_INJECT_OBJ.METAMASK,
          });

          const tx = await contract?.withDrawEth({
            amount: web3.utils.toWei(amount, "ether"),
            willId: Number(scWillId),
          });
          res2 = (await tx.send({
            from: address,
          })) as any;
          if (res2.transactionHash) {
            WillToast.success("Withdraw success!");
            if (successSend) {
              successSend(formWei(amount, `${decimal}`));
            }
          }
        }
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

  useEffect(() => {
    const obj = listBalances.find((e) => e.assetAddress === token.assetAddress);
    setDecimal(obj.decimal);
  }, [token]);

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
          <Text className="neutral-1 font-semibold">
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
          <AppButton
            size="xl"
            className="token-modal--footer-btn"
            onClick={() => {
              onClose();
            }}
          >
            <Text size="text-lg" className="uppercase font-bold neutral-1">
              Cancel
            </Text>
          </AppButton>
        </Flex>
      </Flex>
    </WillModal>
  );
};
