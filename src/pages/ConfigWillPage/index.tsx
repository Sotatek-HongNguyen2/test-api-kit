import { AppButton } from "@/components/atoms/button";
import { Text } from "@/components/atoms/text";
import { AssetTableWithAction } from "@/components/molecules/asset-item/AssetTableWithAction";
import { WillTypeCard } from "@/components/organisms";
import { WrapperContainer } from "@/components/organisms/wrapper-container";
import { WillForm } from "@/components/templates/form";
import { Flex, Form } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ConfigWillPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isConfigured, setIsConfigured] = useState(false);

  const onFinish = (values: any) => {
    console.log("values: ", values);
    setIsConfigured(true);
  };
  return (
    <WrapperContainer title="Configure your will">
      <Form
        form={form}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Flex vertical gap={16}>
          {
            isConfigured ? (
              <>
                <AssetTableWithAction />
                <AppButton type="primary" className="none-styles">
                  <Text size="text-lg" className="font-bold">Save</Text>
                </AppButton>
              </>
            ) : (
              <>
                <WillTypeCard />
                <WillForm />
                <Flex align="center" gap={16}>
                  <AppButton
                    size="xl"
                    type="primary"
                    className="uppercase font-bold"
                    htmlType="submit"
                  >
                    Configure will
                  </AppButton>
                  <AppButton
                    size="xl"
                    className="uppercase font-bold neutral-1 transparent"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </AppButton>
                </Flex>
              </>
            )
          }
        </Flex>
      </Form>
    </WrapperContainer>
  );
};
