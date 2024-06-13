import { BSC_CHAIN_ID, BSC_CHAIN_NAME, BSC_RPC_URL } from '@/const/envs';
import type { AddEthereumChainParameter } from '@web3-react/types';

interface BasicChainInformation {
  urls: string[];
  name: string;
}
interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter['nativeCurrency'];
  blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls'];
}

type ChainConfig = {
  [chainId: number]: BasicChainInformation | ExtendedChainInformation;
};


export const CHAINS: ChainConfig = {
  [BSC_CHAIN_ID]: {
    urls: [BSC_RPC_URL].filter(Boolean),
    name: BSC_CHAIN_NAME,
  },
};
