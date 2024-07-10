import { NoteIcon } from "@/assets/icons/custom-icon"
import { CardDisclosureProps, CartItemContainer } from "@/components/organisms/details-card/CardItemContainer"
import { Form } from "antd"
import { AddAssetDistributionForm } from "../AddAssetDistributionForm"

export const AssetDistribution = (props: CardDisclosureProps) => {
  return (
    <CartItemContainer
      title="Configure asset distribution"
      iconTitle={<NoteIcon />}
      {...props}
    >
      <Form.Item
        name="assetDistribution"
        rules={[{ required: true, message: 'Please select at least an asset and save' }]}
      >
        <AddAssetDistributionForm />
      </Form.Item>
    </CartItemContainer>
  )
}