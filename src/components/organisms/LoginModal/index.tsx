import WillModal from "@/components/atoms/modal";
import OptionLogin from "@/components/molecules/OptionLogin";
import { useState } from "react";

interface IWillModalLogin {
  open: boolean;
  handleOk?: () => void;
  handleCancel?: () => void;
  clickOptionLogin: (key: string) => void;
  loading: boolean;
}
const LoginModal = ({
  open,
  handleOk,
  handleCancel,
  clickOptionLogin,
  loading,
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
      <OptionLogin
        loading={loading}
        clickOptionLogin={handelClickOptionLogin}
      />
    </WillModal>
  );
};
export default LoginModal;
