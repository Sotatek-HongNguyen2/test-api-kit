import { WALLET_NAME } from "./wallet.abstract";
import WalletMetamask from "./wallet.metamask";

export type Wallet = WalletMetamask;

const WALLETS: Record<WALLET_NAME, Wallet> = {
  [WALLET_NAME.METAMASK]: new WalletMetamask(),
};

export { WALLET_NAME } from "./wallet.abstract";
export { default as WalletMetamask } from "./wallet.metamask";
export default WALLETS;
