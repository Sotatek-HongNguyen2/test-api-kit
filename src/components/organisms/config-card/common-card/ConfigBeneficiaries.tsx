import { Form } from "antd";
import { useState } from "react";

import { BeneficiariesIcon } from "@/assets/icons/custom-icon";
import {
  CustomRadioItemProps,
  RadioGroup,
} from "@/components/molecules/radio-group";
import { CartItemContainer } from "@/components/organisms/details-card/CardItemContainer";

import { ConfigBeneficiariesForm } from "../ConfigBeneficiariesForm";

export const ConfigBeneficiaries = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const configOptions: CustomRadioItemProps[] = [
    {
      id: 1,
      value: "existing",
      title: "Use existing address",
      // itemChildren: <ConfigBeneficiariesForm />,
    },
    {
      id: 2,
      value: "generate",
      title: "Generate a new address",
      // itemChildren: <ConfigBeneficiariesForm generate={true} />,
    },
  ];

  const handleChangeOption = (e: any) => {
    setSelectedOption(e);
  };

  return (
    <CartItemContainer
      title="Configure beneficiaries"
      iconTitle={<BeneficiariesIcon />}
    >
      <Form.Item
        name="beneficiaries"
      // rules={[{ required: true, message: "Please select an option" }]}
      >
        <RadioGroup onChange={handleChangeOption} items={configOptions} />
      </Form.Item>
      {selectedOption && (
        <ConfigBeneficiariesForm generate={selectedOption === "generate"} />
      )}
    </CartItemContainer>
  );
};
