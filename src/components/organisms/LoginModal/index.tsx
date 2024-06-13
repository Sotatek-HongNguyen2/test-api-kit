import { useMemo } from "react";

import WillModal from "@/components/atoms/modal";
import OptionLogin from "@/components/molecules/OptionLogin";
import MetaMaskUnavailable from "@/components/molecules/MetamaskUnavailable";

interface IWillModalLogin {
  open: boolean;
  handleOk?: () => void;
  handleCancel?: () => void;
  clickOptionLogin: (key: string) => void;
  loading: boolean;
}
const LoginModal = ({
  open,
  handleCancel,
  clickOptionLogin,
  loading,
}: IWillModalLogin) => {
  const handelClickOptionLogin = async (key: string) => {
    clickOptionLogin(key);
  };

  const hasMetamask: boolean = useMemo(() => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      return true;
    }
    return false;
  }, [open]);

  return (
    <WillModal
      width={448}
      open={open}
      title={loading || !hasMetamask ? "" : "Connect Wallet"}
      handleCancel={handleCancel}
      className="will-modal-login"
      hideFooter={true}
    >
      {hasMetamask ? (
        <OptionLogin
          loading={loading}
          clickOptionLogin={handelClickOptionLogin}
        />
      ) : (
        <MetaMaskUnavailable cancel={handleCancel} />
      )}
    </WillModal>
  );
};
export default LoginModal;
