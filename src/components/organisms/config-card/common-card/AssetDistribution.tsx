import { NoteIcon } from "@/assets/icons/custom-icon"
import { CartItemContainer } from "@/components/organisms/details-card/CardItemContainer"
import { Form } from "antd"
import { AddAssetDistributionForm } from "../AddAssetDistributionForm"

export const AssetDistribution = () => {
  return (
    <CartItemContainer
      title="Configure asset distribution"
      iconTitle={<NoteIcon />}
    >
      <Form.Item>
        <AddAssetDistributionForm />
      </Form.Item>
    </CartItemContainer>
  )
}