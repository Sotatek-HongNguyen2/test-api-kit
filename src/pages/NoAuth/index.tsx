import { Flex } from "antd";

import NoAuthNotify from "@/components/molecules/NoAuthNotify";
import LoginModal from "@/components/organisms/LoginModal";
import { useHandleLogin } from "@/hooks/useHandleLogin";
import WillModal from "@/components/atoms/modal";
import NetworkUnSupport from "@/components/molecules/NetworkUnSupport";

export function NoAuth() {
  const {
    handelClickOptionLogin,
    isOpen,
    setIsOpen,
    loadingLogin,
    setUnSupportNetwork,
    unSupportNotwork,
  } = useHandleLogin();

  const handelOpenModalLogin = async () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setUnSupportNetwork(false);
  };

  return (
    <Flex vertical gap="5vh">
      <NoAuthNotify connect={handelOpenModalLogin} />
      <LoginModal
        loading={loadingLogin}
        clickOptionLogin={handelClickOptionLogin}
        open={isOpen}
        handleCancel={() => {
          setIsOpen(false);
        }}
      >
        <WillModal
          width={448}
          open={unSupportNotwork}
          title={""}
          handleCancel={closeModal}
          className="will-modal-login"
          hideFooter={true}
        >
          <NetworkUnSupport cancel={closeModal} />
        </WillModal>
      </LoginModal>
    </Flex>
  );
}
