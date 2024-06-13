import { NotifyNoAuth } from "@/assets/icons";
import "./styles.scss";
import { AppButton } from "@/components/atoms/button";

import { Card, Flex } from "antd";

interface MetaMaskUnavailableProps {
  connect: () => void;
}

const NoAuthNotify = ({ connect }: MetaMaskUnavailableProps) => {
  return (
    <Flex justify="center">
      <Card className="main-card-no-auth">
        <div className="metamask-unavailable">
          <div className="icon-error">
            <NotifyNoAuth />
          </div>

          <div className="title">Connect Wallet</div>
          <div className="description">
            Connect your crypto wallet to embark on your blockchain adventure
            and secure your digital assets in the crypto world.
          </div>

          <AppButton
            block
            className="btn-connect-wallet"
            type="primary"
            onClick={connect}
          >
            connect wallet
          </AppButton>
        </div>
      </Card>
    </Flex>
  );
};

export default NoAuthNotify;
