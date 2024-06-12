const BSC_CHAIN_ID = import.meta.env.VITE_ETH_CHAIN_ID as string;
const BSC_CHAIN_ID_HEX = import.meta.env.VITE_ETH_HEX_CHAIN_ID as string;
const BSC_BLOCK_EXPLORER_URL = import.meta.env.VITE_ETH_SCAN_URL as string;
const BSC_RPC_URL = import.meta.env.VITE_ETH_RPC_URL as string;
const BSC_CHAIN_NAME = import.meta.env.VITE_ETH_NAME as string;
const SIGN_MESSAGE = import.meta.env.VITE_AUTH_MESSAGE_SIGN;

export {
  BSC_CHAIN_ID,
  BSC_CHAIN_ID_HEX,
  BSC_CHAIN_NAME,
  BSC_RPC_URL,
  BSC_BLOCK_EXPLORER_URL,
  SIGN_MESSAGE,
};
