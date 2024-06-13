import { MetamaskUnavailable } from "@/assets/icons";
import "./styles.scss";
import { AppButton } from "@/components/atoms/button";

interface MetaMaskUnavailableProps {
  cancel?: () => void;
}

const MetaMaskUnavailable = ({ cancel }: MetaMaskUnavailableProps) => {
  return (
    <div className="metamask-unavailable">
      <div className="icon-error">
        <MetamaskUnavailable />
      </div>

      <div className="title">Web3 wallet not detected</div>
      <div className="description">
        Please make sure your wallet is unlocked and available.
      </div>
      <div className="description">
        If you do not currently have Web3 wallet, we suggest
      </div>

      <div className="main-link">
        <a
          className="link-description "
          href="https://metamask.io/download/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Metamask.
        </a>
      </div>

      <AppButton block className="btn-cancel-login" onClick={cancel}>
        CANCEL
      </AppButton>
    </div>
  );
};

export default MetaMaskUnavailable;
