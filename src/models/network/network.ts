import { PROVIDER_TYPE } from "../contract/evm/contract";

// enum configs
export enum NETWORK_NAME {
  ETHEREUM = "ethereum",
}

export enum NETWORK_TYPE {
  EVM = "EVM",
}

export enum EVM_CHAIN {
  MAINNET = "mainnet",
  SEPOLIA = "sepolia",
}

export enum CHAIN_TYPE {
  MAINNET = "mainnet",
  TESTNET = "testnet",
  DEVNET = "devnet",
}

// used types
// evm chain types
export type NetworkEVMProviderType = {
  type: PROVIDER_TYPE.HTTP | PROVIDER_TYPE.HTTPS;
  uri: string;
};

export type NetworkLogo = {
  base: string;
  header: string;
};

export type NativeCurrency = {
  name: string;
  symbol: string;
  decimals: number;
};

export type NetworkEVMChainMetadataType = {
  chainId: string;
  hexChainId: string;
  chainType: CHAIN_TYPE;
  chainName: string;
  provider: NetworkEVMProviderType;
  scanUrl: string;
};

export type NetworkEVMmetadataType = {
  logo: NetworkLogo;
} & NetworkEVMChainMetadataType;

// constants
export const EVM_CHAINS_METADATA: Record<
  EVM_CHAIN,
  NetworkEVMChainMetadataType
> = {
  [EVM_CHAIN.MAINNET]: {
    chainId: "1",
    hexChainId: "0x1",
    chainType: CHAIN_TYPE.MAINNET,
    chainName: "ethereum",
    provider: {
      type: PROVIDER_TYPE.HTTPS,
      uri: "https://mainnet.infura.io/v3/",
    },
    scanUrl: "https://etherscan.io",
  },
  [EVM_CHAIN.SEPOLIA]: {
    chainId: "11155111",
    hexChainId: "0xaa36a7",

    chainType: CHAIN_TYPE.TESTNET,
    chainName: "sepolia",
    provider: {
      type: PROVIDER_TYPE.HTTPS,
      uri: "https://rpc.sepolia.ethpandaops.io",
    },
    scanUrl: "https://sepolia.etherscan.io",
  },
};

export const getEVMMetadata = (chain: EVM_CHAIN) => EVM_CHAINS_METADATA[chain];

// default export
type Network = {
  name: NETWORK_NAME.ETHEREUM;
  type: NETWORK_TYPE.EVM;
  nativeCurrency: NativeCurrency;
  metadata: NetworkEVMmetadataType;
};

export default Network;
