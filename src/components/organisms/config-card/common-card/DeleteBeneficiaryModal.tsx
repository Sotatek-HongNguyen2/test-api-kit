import WillImage from "@/components/atoms/Image";
import { AppButton } from "@/components/atoms/button";
import WillModal from "@/components/atoms/modal"
import { Text } from "@/components/atoms/text";
import { Flex } from "antd";
import ModalDeleteIcon from "../../../../../public/images/modal-delete-icon.png";

interface DeleteBeneficiaryModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  selectedAddress: string;
}

export const DeleteBeneficiaryModal = (props: DeleteBeneficiaryModalProps) => {
  const { selectedAddress, open, onClose, onDelete } = props;
  return (
    <WillModal
      open={open}
      handleCancel={onClose}
      hideFooter
    >
      <Flex vertical justify="center" align="center" gap={32}>
        <WillImage src={ModalDeleteIcon} />
        <Flex vertical gap={8}>
          <Text
            size="text-2xl"
            align="center"
            className="font-bold neutral-1"
          >
            You’re deleting a beneficiary
          </Text>
          <Text
            size="text-sm"
            align="center"
            className="neutral-2"
          >
            Are you sure you want to delete
            {` ${selectedAddress?.substring(0, 10)}...${selectedAddress?.substring(
              selectedAddress?.length - 3,
              selectedAddress?.length
            )}`} from your will?
          </Text>
        </Flex>
        <Flex vertical gap={10} style={{ width: "100%" }}>
          <AppButton
            size="large"
            type="error"
            onClick={() => {
              onDelete();
              onClose();
            }}
          >
            <Text size="text-lg" className="font-bold uppercase">Delete now</Text>
          </AppButton>
          <AppButton size="large" onClick={onClose}>
            <Text size="text-lg" className="font-bold uppercase">Cancel</Text>
          </AppButton>
        </Flex>
      </Flex>
    </WillModal>
  )
}