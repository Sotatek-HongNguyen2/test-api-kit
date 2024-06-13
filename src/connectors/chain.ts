import type { AddEthereumChainParameter } from "@web3-react/types";

import { ETH_CHAIN_ID, ETH_CHAIN_NAME, ETH_RPC_URL } from "@/const/envs";

interface BasicChainInformation {
  urls: string[];
  name: string;
}
interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter["nativeCurrency"];
  blockExplorerUrls: AddEthereumChainParameter["blockExplorerUrls"];
}

type ChainConfig = {
  [chainId: number]: BasicChainInformation | ExtendedChainInformation;
};

export const CHAINS: ChainConfig = {
  [ETH_CHAIN_ID]: {
    urls: [ETH_RPC_URL].filter(Boolean),
    name: ETH_CHAIN_NAME,
  },
};
