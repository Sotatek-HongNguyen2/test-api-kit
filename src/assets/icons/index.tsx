import { SVGAttributes } from "react";
import ReactSVG from "react-inlinesvg";

export const ConnectWallet = () => (
  <ReactSVG src={"/icons/login/connect-wallet.svg"} />
);
export const LogoMetamask = () => (
  <ReactSVG src={"/icons/login/logo-metamask.svg"} />
);
export const ToastCloseIcon = () => (
  <ReactSVG src={"/icons/toast/toast-close-icon.svg"} />
);
export const ToastInfoIcon = () => (
  <ReactSVG src={"/icons/toast/toast-info-icon.svg"} />
);
export const MetamaskUnavailable = () => (
  <ReactSVG src={"/icons/login/metamask-unavailable.svg"} />
);

export const NotifyNoAuth = () => (
  <ReactSVG src={"/icons/no-auth/notify.svg"} />
);

type SvgIconProps = Omit<React.SVGProps<SVGElement>, 'onLoad' | 'onError' | 'ref'>;

export const NoData = (props: SvgIconProps) => <ReactSVG {...props} src={"/images/lists/no-data.svg"} />;
export const IconError = () => <ReactSVG src={"/icons/toast/icon-error.svg"} />;
export const IconSuccess = () => (
  <ReactSVG src={"/icons/toast/icon-success.svg"} />
);

export const Wallet = () => <ReactSVG src={"/icons/login/Wallet.svg"} />;
export const Logout = () => <ReactSVG src={"/icons/login/logout.svg"} />;
export const LogoETH = () => <ReactSVG src={"/icons/network/eth.svg"} />;
export const LogoDAI = () => <ReactSVG src={"/icons/network/dai.svg"} />;
export const LogoUSDC = () => <ReactSVG src={"/icons/network/usdc.svg"} />;

export const LogoETH200 = () => <ReactSVG src={"/icons/network/eth_200.svg"} />;
export const LogoDAI200 = () => <ReactSVG src={"/icons/network/dai_200.svg"} />;
export const LogoUSDC200 = () => (
  <ReactSVG src={"/icons/network/usdc_200.svg"} />
);

export const NoAvatar = () => <ReactSVG src={"/icons/no-auth/no-avatar.svg"} />;
export const NoAvatar36 = () => (
  <ReactSVG src={"/icons/no-auth/no-avatar36.svg"} />
);

export const Plus = () => <ReactSVG src={"/icons/plus.svg"} />;
export const Close = () => <ReactSVG src={"/icons/close.svg"} />;
