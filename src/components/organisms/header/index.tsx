import { Flex } from "antd"
import "./header.scss"
import { FAQIcon } from "@/components/atoms/icons"
import { AppButton, IconButton } from "@/components/atoms/button"
import defaultAvatar from '@/assets/images/default-avt.png';
import { ConnectButton } from "@/components/molecules";

export const Header = () => {
  return (
    <Flex id="app-header" justify="flex-end" align="center" gap={10}>
      <IconButton>
        <FAQIcon />
      </IconButton>
      <ConnectButton />
      <AppButton className="none-styles">
        <img src={defaultAvatar} />
      </AppButton>
    </Flex>
  )
}