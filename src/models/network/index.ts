import Network, { NETWORK_NAME } from "./network";
import NetworkEthereum from "./network.ethereum";

const NETWORKS: Record<NETWORK_NAME, Network> = {
  [NETWORK_NAME.ETHEREUM]: NetworkEthereum,
};

export type { default as Network } from "./network";
export { NETWORK_NAME } from "./network";
export type { default as NetworkEthereum } from "./network.ethereum";
export default NETWORKS;
