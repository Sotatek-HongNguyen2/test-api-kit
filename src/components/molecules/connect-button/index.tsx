import "./styles.scss";
import { useMemo } from "react";
import clsx from "clsx";
import { Flex } from "antd";

import {
  getAuthSlide,
  getWalletInstanceSlice,
  getWalletSlice,
  useAppSelector,
} from "@/store";
import { AppButton, IconButton } from "@/components/atoms/button";
import useDisclosure from "@/hooks/useDisclosure";
import { WalletIcon } from "@/assets/icons/custom-icon";
import { UserIcon } from "@/assets/icons/custom-icon/user-icon";
import { Wallet } from "@/assets/icons";

interface IPropsConnectButton {
  clickLogin: () => void;
}

export const ConnectButton = ({ clickLogin }: IPropsConnectButton) => {
  const { address } = useAppSelector(getWalletSlice);
  const { accessToken } = useAppSelector(getAuthSlide);
  const { balance } = useAppSelector(getWalletInstanceSlice);

  const displayedAddress = useMemo(
    () =>
      `${address?.substring(0, 10)}...${address?.substring(
        address?.length - 4,
        address?.length - 1
      )}`,
    [address]
  );
  const { isOpen, onToggle } = useDisclosure();

  const handleClickLogin = async () => {
    clickLogin();
  };

  return (
    <>
      {accessToken ? (
        <div className="connected-btn">
          <Flex align="center" gap={10}>
            <IconButton type="primary-outlined">
              <UserIcon />
            </IconButton>
            <AppButton
              type="primary-outlined"
              icon={<WalletIcon />}
              onClick={onToggle}
            >
              {displayedAddress}
            </AppButton>
          </Flex>
          <div className={clsx("user-balance", { visible: isOpen })}>
            {balance ?? 0}
          </div>
        </div>
      ) : (
        <Flex align="center" gap={10}>
          <IconButton type="primary-outlined">
            <UserIcon />
          </IconButton>
          <AppButton
            icon={<Wallet />}
            type="primary"
            onClick={handleClickLogin}
          >
            CONNECT WALLET
          </AppButton>
        </Flex>
      )}
    </>
  );
};
