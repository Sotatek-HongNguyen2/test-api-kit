import { Col, Row } from "antd";

import "./styles.scss";
import WillText from "@/components/atoms/WillText";
import WillImage from "@/components/atoms/Image";
import { ConnectWallet, LogoMetamask } from "@/assets/icons";

interface IOptionLogin {
  name: string;
  icon: React.ReactNode;
  key: string;
}

interface PropsOptionLogin {
  clickOptionLogin: (key: string) => void;
  loading: boolean;
}

const OptionLogin = ({ clickOptionLogin, loading }: PropsOptionLogin) => {
  const arr: IOptionLogin[] = [
    {
      name: "MetaMask",
      icon: <LogoMetamask />,
      key: "metamask",
    },
    {
      name: "WalletConnect",
      icon: <ConnectWallet />,
      key: "wallet_connect",
    },
  ];

  const handleClickOptionLogin = (item: IOptionLogin) => {
    clickOptionLogin(item.key);
  };

  return (
    <div>
      {!loading ? (
        arr.map((item: IOptionLogin) => {
          return (
            <Row
              className="item-option-login"
              key={item.key}
              onClick={() => {
                handleClickOptionLogin(item);
              }}
            >
              <Col span={8} className="option-image">
                <WillImage>{item.icon}</WillImage>
              </Col>
              <Col span={12} offset={4} className="option-name">
                <WillText className="text-option-name">{item.name}</WillText>
              </Col>
            </Row>
          );
        })
      ) : (
        <>
          <div className="position-loading">
            <span className="loader"></span>
          </div>
          <div className="initializing">Initializing...</div>
        </>
      )}
    </div>
  );
};
export default OptionLogin;
