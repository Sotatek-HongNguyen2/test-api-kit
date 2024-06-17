import { AppInput } from "@/components/atoms/input"
import "./styles.scss"
import { AppButton } from "@/components/atoms/button"
import WillModal from "@/components/atoms/modal"
import { Text } from "@/components/atoms/text"
import { Flex } from "antd"
import { useState } from "react"

export type TokenModalType = "deposit" | "withdraw";

interface TokenModalProps {
  open: boolean;
  onClose: () => void;
  type: TokenModalType;
  tokenSign: string;
  handleSubmit: (value: number) => void;
}

export const TokenModal = (props: TokenModalProps) => {
  const { open, onClose, type, handleSubmit, tokenSign } = props;
  const [amount, setAmount] = useState<number>(0);
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
            suffix={<Text className="font-semibold neutral-1">{tokenSign}</Text>}
            type="number"
            value={amount}
            min={0}
            onChange={(e) => setAmount(e.target.value as unknown as number)}
          />
        </Flex>
        <Flex align="center" className="uppercase" justify="space-between" gap={20}>
          <AppButton size="xl" className="token-modal--footer-btn" onClick={onClose}>Cancel</AppButton>
          <AppButton
            type="primary"
            className="token-modal--footer-btn capitalize"
            size="xl"
            onClick={() => {
              handleSubmit(amount);
              onClose();
              setAmount(0);
            }}
          >
            {type}
          </AppButton>
        </Flex>
      </Flex>
    </WillModal>
  )
}