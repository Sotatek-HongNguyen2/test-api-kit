import { ethers } from 'ethers';

import { ESystemNetwork } from 'src/types/transaction-history';

export const signMessage = async (signer: ethers.providers.JsonRpcSigner, message: string): Promise<string> => {
  return signer?.signMessage(message);
};

export const validateAddress = (address: string, network: ESystemNetwork) => {
  const reBitcoinMainnet = new RegExp(/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/);
  const reBitcoinTestnet = new RegExp(/^(tb1|[2nm]|bcrt)[a-zA-HJ-NP-Z0-9]{25,40}$/);

  const reLitecoinMainnet = new RegExp(/^([L3M]|(ltc))\w{26,40}$/);
  const reLitecoinTestnet = new RegExp(/^([mn]|2|Q|tltc)\w{26,40}$/);

  const tronNet = new RegExp(/^T[A-Za-z1-9]{33}$/);
  // const arbitrumTestnet = new RegExp(/^0x[0-9a-fA-F]{40}$/);
  // ESystemNetwork.ARBITRUM

  switch (network) {
    case ESystemNetwork.BITCOIN:
      return reBitcoinMainnet.test(address) || reBitcoinTestnet.test(address);
    case ESystemNetwork.ETHEREUM:
      return ethers.utils.isAddress(address);
    case ESystemNetwork.BNB:
      return ethers.utils.isAddress(address);
    case ESystemNetwork.LITECOIN:
      return reLitecoinMainnet.test(address) || reLitecoinTestnet.test(address);
    case ESystemNetwork.ARBITRUM:
      return ethers.utils.isAddress(address);
    case ESystemNetwork.TRON:
      return tronNet.test(address);
    default:
      return false;
  }
};
