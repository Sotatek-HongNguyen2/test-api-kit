import { AppButton } from "@/components/atoms/button";
import { WillTypeCard } from "@/components/organisms";
import { WrapperContainer } from "@/components/organisms/wrapper-container";
import { WillForm } from "@/components/templates/form";
import { Flex, Form } from "antd";
import { useNavigate } from "react-router-dom";

export function ConfigWillPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("values: ", values);
  };
  return (
    <WrapperContainer title="Configure your will">
      <Form
        form={form}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Flex vertical gap={16}>
          <WillTypeCard />
          <WillForm />
          <Flex align="center" justify="space-between">
            <AppButton
              size="xl"
              className="uppercase font-bold neutral-1 transparent"
              onClick={() => navigate(-1)}
            >
              Cancel
            </AppButton>
            <AppButton
              size="xl"
              type="primary"
              className="uppercase font-bold"
              htmlType="submit"
            >
              Configure will
            </AppButton>
          </Flex>
        </Flex>
      </Form>
    </WrapperContainer>
  );
};
