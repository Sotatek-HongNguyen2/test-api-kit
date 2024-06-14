import { useMemo, useState } from "react";

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
  const [openNoMetamask, setOpenNoMetamask] = useState<boolean>(false);
  const handelClickOptionLogin = async (key: string) => {
    if (key !== "metamask") {
      clickOptionLogin(key);
      return;
    }
    if (window.ethereum && window.ethereum.isMetaMask) {
      clickOptionLogin(key);
    } else {
      setOpenNoMetamask(true);
    }
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
      <OptionLogin
        loading={loading}
        clickOptionLogin={handelClickOptionLogin}
      />
      <WillModal
        width={448}
        open={openNoMetamask}
        title={"Connect Wallet"}
        handleCancel={() => {
          setOpenNoMetamask(false);
        }}
        className="will-modal-login"
        hideFooter={true}
      >
        <MetaMaskUnavailable
          cancel={() => {
            setOpenNoMetamask(false);
          }}
        />
      </WillModal>
    </WillModal>
  );
};
export default LoginModal;
