import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { Multicall } from "ethereum-multicall";

import { formWei } from "@/helpers/common";
import willV1 from "@/constants/willV1";
import willV2 from "@/constants/willV2";
import { PROVIDER_TYPE } from "@/models/contract/evm/contract";
import { WALLET_INJECT_OBJ } from "@/models/wallet/wallet.abstract";
import { getWeb3Instance } from "@/helpers/evmHandlers";

export type CommonType = {
  listBalances: any[];
};

const initialState: CommonType = {
  listBalances: [],
};

export const fetchBalances = createAsyncThunk(
  "balances/fetchBalances",
  async (userAddress: string) => {
    const providerUrl = import.meta.env.VITE_ETH_RPC_URL;
    const contractContexts = [
      {
        reference: "contract1",
        contractAddress: import.meta.env.VITE_TOKEN_CONTRACT_1,
        abi: [...willV1],
        calls: [
          {
            reference: "balanceOf1",
            methodName: "balanceOf",
            methodParameters: [userAddress],
          },
          {
            reference: "decimals1",
            methodName: "decimals",
            methodParameters: [],
          },
          {
            reference: "name1",
            methodName: "name",
            methodParameters: [],
          },
          {
            reference: "symbol1",
            methodName: "symbol",
            methodParameters: [],
          },
        ],
      },
      {
        reference: "contract2",
        contractAddress: import.meta.env.VITE_TOKEN_CONTRACT_2,
        abi: [...willV2],
        calls: [
          {
            reference: "balanceOf2",
            methodName: "balanceOf",
            methodParameters: [userAddress],
          },
          {
            reference: "decimals2",
            methodName: "decimals",
            methodParameters: [],
          },
          {
            reference: "name2",
            methodName: "name",
            methodParameters: [],
          },
          {
            reference: "symbol3",
            methodName: "symbol",
            methodParameters: [],
          },
        ],
      },
    ];
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);

    const multicall = new Multicall({
      ethersProvider: provider,
      tryAggregate: true,
    });

    const results = await multicall.call(contractContexts);
    const fetchedBalances = Object.keys(results.results).map((key: any) => {
      const callsReturnContext = results.results[key].callsReturnContext;
      const assetAddress: string =
        results.results[key].originalContractCallContext.contractAddress;
      return {
        balance: formWei(
          callsReturnContext[0].returnValues[0].hex,
          callsReturnContext[1].returnValues[0]
        ),
        decimal: callsReturnContext[1].returnValues[0],
        name: callsReturnContext[2].returnValues[0],
        symbol: callsReturnContext[3].returnValues[0],
        assetAddress,
      };
    });
    const web3 = getWeb3Instance({
      type: PROVIDER_TYPE.WALLET,
      injectObject: WALLET_INJECT_OBJ.METAMASK,
    });
    const ethBalance = formWei(
      (await web3.eth.getBalance(userAddress)).toString(),
      18
    );
    fetchedBalances.unshift({
      balance: ethBalance,
      decimal: 18,
      name: "Ethereum",
      symbol: "ETH",
      assetAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    });

    return fetchedBalances;
  }
);

const balancesSlice = createSlice({
  name: "balances",
  initialState,
  reducers: {
    updateIsMatchNetwork(state, action: PayloadAction<any>) {
      state.listBalances = action.payload;
    },
  },
});

export const balancesSliceActionThunk = {
  fetchBalances,
};
export const balancesSliceActions = { ...balancesSlice.actions };

export default balancesSlice.reducer;
