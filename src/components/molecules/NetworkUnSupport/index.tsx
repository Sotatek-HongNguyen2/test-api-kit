import { MetamaskUnavailable } from "@/assets/icons";
import { AppButton } from "@/components/atoms/button";
import "./styles.scss";

interface MetaMaskUnavailableProps {
  cancel?: () => void;
}

const NetworkUnSupport = ({ cancel }: MetaMaskUnavailableProps) => {
  return (
    <div className="metamask-unavailable">
      <div className="icon-error">
        <MetamaskUnavailable />
      </div>

      <div className="title">Wrong Network</div>
      <div className="description">
        You are connecting to unsupported network. Please connect the
        appropriate Ethereum network.
      </div>

      <AppButton block className="btn-disconnected" onClick={cancel}>
        Disconnected
      </AppButton>
    </div>
  );
};

export default NetworkUnSupport;
