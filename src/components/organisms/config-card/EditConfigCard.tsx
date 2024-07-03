import "./styles.scss"
import { ConfigureIcon } from "@/assets/icons/custom-icon/configure-icon"
import { CartItemContainer } from "../details-card/CardItemContainer"
import { Flex } from "antd"
import { ConfigBeneficiaries } from "./common-card/ConfigBeneficiaries"
import { AssetToBeneficiary } from "./AssetToBeneficiary"
import { ActivationTrigger } from "./common-card/ActivationTrigger"
import { AppButton } from "@/components/atoms/button"
import { Text } from "@/components/atoms/text"
import { useState } from "react"
import WillToast from "@/components/atoms/ToastMessage"
import { AssetDistribution } from "./common-card/AssetDistribution"

export const EditConfigCard = () => {

  const [loading, setLoading] = useState(false);

  const handleUpdateConfig = async () => {
    try {
      setLoading(true);
    } catch (error: any) {
      WillToast.error(error?.message)
    } finally {
      setLoading(false);
    }
  }

  return (
    <CartItemContainer
      title="Configure"
      iconTitle={<ConfigureIcon />}
    >
      <Flex vertical gap={16} className="update-config">
        <ConfigBeneficiaries />
        <AssetDistribution />
        <AssetToBeneficiary />
        <AppButton
          type="primary"
          size="xl"
          className="none-styles"
          onClick={handleUpdateConfig}
          loading={loading}
        >
          <Text className="uppercase" size="text-lg">Save</Text>
        </AppButton>
      </Flex>
    </CartItemContainer>
  )
}