import Web3, { ProviderMessage, ProviderRpcError } from "web3";
import { MetaMaskInpageProvider, RequestArguments } from "@metamask/providers";
import _ from "lodash";

import { store } from "@/store";
import { handleRequest } from "@/helpers/asyncHandlers";
import { getWeb3Instance } from "@/helpers/evmHandlers";
import { formWei } from "@/helpers/common";

import { PROVIDER_TYPE, ProviderType } from "../contract/evm/contract";
import Wallet, {
  URL_INSTALL_ANDROID,
  URL_INSTALL_EXTENSION,
  URL_INSTALL_IOS,
  WALLET_EVENT_NAME,
  WALLET_INJECT_OBJ,
  WALLET_NAME,
} from "./wallet.abstract";
import Network, { NETWORK_NAME, NETWORK_TYPE } from "../network/network";

export type WalletMetamaskEvents =
  | {
      eventName: WALLET_EVENT_NAME.ACCOUNTS_CHANGED;
      handler: (accounts?: Array<string>) => void;
    }
  | {
      eventName: WALLET_EVENT_NAME.CHAIN_CHANGED;
      handler: (chainId?: string) => void;
    }
  | {
      eventName: WALLET_EVENT_NAME.DISCONNECT;
      handler: (error?: ProviderRpcError) => void;
    }
  | {
      eventName: WALLET_EVENT_NAME.MESSAGE;
      handler: (message?: ProviderMessage) => void;
    };
export default class WalletMetamask extends Wallet {
  errorList = {
    WALLET_NOT_INSTALLED: `Please install ${this.name} wallet`,
    WALLET_WRONG_CHAIN: "You have connected to unsupported chain",
    WALLET_CONNECT_FAILED: "Fail to connect wallet",
    WALLET_CONNECT_REJECTED: "User rejected the request.",
    WALLET_GET_BALANCE_FAIL: "Can't get the current balance",
  };
  errorMessageList = {};

  constructor() {
    super({
      name: WALLET_NAME.METAMASK,
      metadata: {
        displayName: "Metamask",
        supportedNetwork: [NETWORK_NAME.ETHEREUM],
        InjectedObject: WALLET_INJECT_OBJ.METAMASK,
        logo: {
          base: "/assets/logos/logo.metamask.png",
        },
        installationURL: {
          pc: URL_INSTALL_EXTENSION.METAMASK,
          android: URL_INSTALL_ANDROID.METAMASK,
          ios: URL_INSTALL_IOS.METAMASK,
        },
        supportedDevices: {
          [NETWORK_TYPE.EVM]: ["desktop", "smartphone", "tablet"],
        },
      },
    });
  }

  getInjectedObject(): MetaMaskInpageProvider {
    const metadata = store.getState().walletObj.metamask;
    if (!metadata.isInjected)
      throw new Error(this.errorList.WALLET_NOT_INSTALLED);
    return metadata.ethereum!;
  }

  getProvider() {
    return new Web3(this.getInjectedObject());
  }

  async sendRequest<T = unknown>(args: RequestArguments): Promise<T> {
    return (await this.getInjectedObject().request<T>(args)) as T;
  }

  addListener(params: WalletMetamaskEvents, nwType?: NETWORK_TYPE) {
    this.getInjectedObject().on(params.eventName, params.handler as any);
  }
  removeListener(e: WALLET_EVENT_NAME, nwType?: NETWORK_TYPE, id?: any) {
    this.getInjectedObject().removeAllListeners(e);
  }
  async connect(
    network: Network,
    onStart?: () => void,
    onFinish?: () => void,
    onError?: () => void,
    whileHandle?: () => void
  ) {
    let account: string = "";

    const accountArr = await this.sendRequest<string[]>({
      method: "eth_requestAccounts",
    });
    // throw error if cannot get account
    if (
      !accountArr ||
      accountArr.length === 0 ||
      typeof accountArr[0] === "undefined"
    ) {
      throw new Error(this.errorList.WALLET_CONNECT_FAILED);
    }
    // set account if could get correct account
    account = Web3.utils.toChecksumAddress(accountArr[0]);

    return account;
  }

  async createTx() {
    return "";
  }

  async signMessage(walletAddress: string) {
    const message = "Will-2024";
    const signature = await this.sendRequest<string[]>({
      method: "personal_sign",
      params: [message, walletAddress],
    });
    return signature;
  }

  async signTx() {
    return "";
  }

  async getNetwork() {
    return this.sendRequest<string>({
      method: "eth_chainId",
    });
  }

  async getBalance(userAddr: string, decimals: number): Promise<string> {
    const provider: ProviderType = {
      type: PROVIDER_TYPE.WALLET,
      injectObject: WALLET_INJECT_OBJ.METAMASK,
    };
    const web3 = getWeb3Instance(provider);
    const [blnWei, error] = await handleRequest(web3.eth.getBalance(userAddr));
    if (error) throw new Error(this.errorList.WALLET_GET_BALANCE_FAIL);
    return formWei(blnWei!.toString(), decimals);
  }

  async switchNetwork(network: Network) {
    const chainId = await this.getNetwork();
    if (chainId !== network.metadata.chainId) {
      const [_, error] = await handleRequest(
        this.sendRequest({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: network.metadata.chainId,
            },
          ],
        })
      );
      if (error) return false;
    }
    return true;
  }

  async watchToken(params: {
    type: "ERC20";
    options: {
      address: string;
      symbol: string;
      decimals: number;
      image?: string;
    };
  }) {
    return await this.sendRequest({ method: "wallet_watchAsset", params });
  }
}
