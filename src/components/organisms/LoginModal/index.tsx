import WillModal from "@/components/atoms/modal";
import OptionLogin from "@/components/molecules/OptionLogin";
import { useState } from "react";

interface IWillModalLogin {
  open: boolean;
  handleOk?: () => void;
  handleCancel?: () => void;
  clickOptionLogin: (key: string) => void;
}
const LoginModal = ({
  open,
  handleOk,
  handleCancel,
  clickOptionLogin,
}: IWillModalLogin) => {
  const handelClickOptionLogin = async (key: string) => {
    clickOptionLogin(key);
  };

  return (
    <WillModal
      width={448}
      open={open}
      title="Connect Wallet"
      handleCancel={handleCancel}
      className="will-modal-login"
      hideFooter={true}
    >
      <OptionLogin clickOptionLogin={handelClickOptionLogin} />
    </WillModal>
  );
};
export default LoginModal;
