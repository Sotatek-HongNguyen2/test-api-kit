import "./styles.scss"
import { AppButton } from "@/components/atoms/button"
import { Text } from "@/components/atoms/text"
import { Flex } from "antd"
import { useNavigate } from "react-router-dom"
import { ArrowOutlinedIcon } from "@/assets/icons/custom-icon"
interface WrapperContainerProps {
  children: React.ReactNode;
  title: string;
}

export const WrapperContainer = (props: WrapperContainerProps) => {
  const { title, children } = props;
  const navigate = useNavigate();
  return (
    <Flex vertical className="app-config-container" gap={24}>
      <AppButton type="normal" onClick={() => navigate(-1)}>
        <Flex gap="16px">
          <ArrowOutlinedIcon />
          <Text size="text-xl" className="font-bold">{title}</Text>
        </Flex>
      </AppButton>
      {children}
    </Flex>
  )
}