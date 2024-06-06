import { Flex } from "antd"
import { PageTitle, PageTitleProps } from "../../molecules"

export const WrapperContainer = (props: PageTitleProps) => {
  return (
    <Flex vertical gap={2}>
      <PageTitle {...props} />
    </Flex>
  )
}