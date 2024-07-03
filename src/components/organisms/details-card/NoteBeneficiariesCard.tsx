import { NoteIcon } from "@/assets/icons/custom-icon";
import { CartItemContainer } from "./CardItemContainer"
import { Text } from "@/components/atoms/text";

export const NoteBeneficiariesCard = ({ note }: { note?: string }) => {

  return (
    <CartItemContainer
      title="Note to beneficiaries"
      iconTitle={<NoteIcon />}
    >
      <Text size="text-sm" className="neutral">{note}</Text>
    </CartItemContainer>
  )
}