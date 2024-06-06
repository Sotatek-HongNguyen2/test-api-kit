import { Button, Flex } from "antd";
import Title from "antd/es/typography/Title";
import { APP_COLORS } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import { Text } from "../../atoms/text";
import { RightOutlined } from '@ant-design/icons';

export interface PageTitleProps {
  title: string;
  backTitle?: string;
  backUrl?: string;
}

export const PageTitle = (props: PageTitleProps) => {
  const { title, backTitle, backUrl } = props;
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (backUrl) {
      navigate(backUrl);
    } else {
      navigate(-1);
    }
  }

  return (
    <Flex vertical gap={1} className="page-title">
      <Title level={4} color={APP_COLORS.textColor} className="font-medium">{title}</Title>
      <Button type="link" className="none-styles" onClick={handleNavigate}>
        <Flex gap={1} align="center">
          {
            backTitle && (
              <>
                <Text size="text-sm" color={APP_COLORS.textColor} className="font-medium">
                  {backTitle}
                </Text>
                <RightOutlined />
              </>
            )
          }
        </Flex>
      </Button>
      
    </Flex>
  )

};