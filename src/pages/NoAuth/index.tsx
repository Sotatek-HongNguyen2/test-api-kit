import { Flex } from "antd";

import NoAuthNotify from "@/components/molecules/NoAuthNotify";
import LoginModal from "@/components/organisms/LoginModal";
import { useHandleLogin } from "@/hooks/useHandleLogin";

export function NoAuth() {
  const { handelClickOptionLogin, isOpen, setIsOpen, loadingLogin } =
    useHandleLogin();

  const handelOpenModalLogin = async () => {
    setIsOpen(true);
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
      />
    </Flex>
  );
}
