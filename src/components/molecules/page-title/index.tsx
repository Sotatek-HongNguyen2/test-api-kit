import "./styles.scss";
import { Button, Flex } from "antd";
import Title from "antd/es/typography/Title";
import { RightOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { APP_COLORS } from "@/constants";
import { Text } from "@/components/atoms/text";

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
        <Flex gap={3} align="center">
          {
            backTitle && (
              <>
                <Text size="text-sm" color={APP_COLORS.textColor} className="font-medium">
                  {backTitle}
                </Text>
                <RightOutlined style={{ width: '0.7em', height: '0.7em', strokeWidth: 2 }} />
              </>
            )
          }
        </Flex>
      </Button>

    </Flex>
  )

};