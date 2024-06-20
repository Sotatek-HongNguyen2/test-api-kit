import { Flex } from "antd";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import NoAuthNotify from "@/components/molecules/NoAuthNotify";
import LoginModal from "@/components/organisms/LoginModal";
import { useHandleLogin } from "@/hooks/useHandleLogin";
import WillModal from "@/components/atoms/modal";
import NetworkUnSupport from "@/components/molecules/NetworkUnSupport";
import {
  getAuthSlide,
  getCommonSlides,
  useAppDispatch,
  useAppSelector,
} from "@/store";
import { commonInstanceSlideActions } from "@/store/slices/common";

export function NoAuth() {
  const {
    handelClickOptionLogin,
    isOpen,
    setIsOpen,
    loadingLogin,
    setUnSupportNetwork,
    unSupportNotwork,
  } = useHandleLogin();

  const { isMatchNetwork, open } = useSelector(getCommonSlides);

  const handelOpenModalLogin = async () => {
    setIsOpen(true);
  };
  const { accessToken } = useAppSelector(getAuthSlide);
  const dispatch = useAppDispatch();

  const closeModal = () => {
    setUnSupportNetwork(false);
  };

  const closeModalUnSp = () => {
    setUnSupportNetwork(false);
    if (open) {
      dispatch(commonInstanceSlideActions.updateOpen(false));
      dispatch(commonInstanceSlideActions.updateIsMatchNetwork(true));
    }
    setIsOpen(true);
  };
  useEffect(() => {
    if (!isOpen && !accessToken && open) {
      // setIsOpen(true);
      setUnSupportNetwork(true);
    }
  }, [isMatchNetwork]);

  return (
    <Flex vertical gap="5vh">
      <NoAuthNotify connect={handelOpenModalLogin} />
      {!open && (
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
      )}
      {open && (
        <WillModal
          width={448}
          open={unSupportNotwork}
          title={""}
          handleCancel={closeModalUnSp}
          className="will-modal-login"
          hideFooter={true}
        >
          <NetworkUnSupport cancel={closeModalUnSp} />
        </WillModal>
      )}
    </Flex>
  );
}
