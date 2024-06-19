import { useState } from "react";

import WillModal from "@/components/atoms/modal";
import OptionLogin from "@/components/molecules/OptionLogin";
import MetaMaskUnavailable from "@/components/molecules/MetamaskUnavailable";

import "./styles.scss";

interface IWillModalLogin {
  open: boolean;
  handleOk?: () => void;
  handleCancel?: () => void;
  clickOptionLogin: (key: string) => void;
  loading: boolean;
  children?: React.ReactNode;
}
const LoginModal = ({
  open,
  handleCancel,
  clickOptionLogin,
  loading,
  children,
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

  return (
    <WillModal
      width={448}
      open={open}
      title={loading ? "" : "Connect Wallet"}
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
        title={""}
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
      {children}
    </WillModal>
  );
};
export default LoginModal;
