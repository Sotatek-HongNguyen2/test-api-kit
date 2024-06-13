const ETH_CHAIN_ID = import.meta.env.VITE_ETH_CHAIN_ID as string;
const ETH_CHAIN_ID_HEX = import.meta.env.VITE_ETH_HEX_CHAIN_ID as string;
const ETH_BLOCK_EXPLORER_URL = import.meta.env.VITE_ETH_SCAN_URL as string;
const ETH_RPC_URL = import.meta.env.VITE_ETH_RPC_URL as string;
const ETH_CHAIN_NAME = import.meta.env.VITE_ETH_NAME as string;
const SIGN_MESSAGE = import.meta.env.VITE_AUTH_MESSAGE_SIGN;

export {
  ETH_CHAIN_ID,
  ETH_CHAIN_ID_HEX,
  ETH_CHAIN_NAME,
  ETH_RPC_URL,
  ETH_BLOCK_EXPLORER_URL,
  SIGN_MESSAGE,
};
