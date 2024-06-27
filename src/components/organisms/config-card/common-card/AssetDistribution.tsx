import { NoteIcon } from "@/assets/icons/custom-icon"
import { CartItemContainer } from "@/components/organisms/details-card/CardItemContainer"
import { Form } from "antd"
import { AddAssetDistributionForm } from "../AddAssetDistributionForm"
import { EditFormProps } from "@/components/templates/form"

export const AssetDistribution = (props: EditFormProps) => {
  return (
    <CartItemContainer
      title="Configure asset distribution"
      iconTitle={<NoteIcon />}
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