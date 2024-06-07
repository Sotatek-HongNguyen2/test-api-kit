import { PageTitle, PageTitleProps } from "@/components/molecules"
import { Flex } from "antd"

interface WrapperContainerProps extends PageTitleProps {
  children: React.ReactNode
}

export const WrapperContainer = (props: WrapperContainerProps) => {
  const { children, ...restProps } = props
  return (
    <Flex vertical gap={10}>
      <PageTitle {...restProps} />
      {children}
    </Flex>
  )
}