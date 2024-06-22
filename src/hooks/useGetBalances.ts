import { useEffect } from "react";

import { getWalletSlice, useAppDispatch, useAppSelector } from "@/store";
import {
  balancesSliceActionThunk,
  balancesSliceActions,
} from "@/store/slices/useBalances";

export default function useGetBalances() {
  const { fetchBalances } = balancesSliceActionThunk;
  const { address } = useAppSelector(getWalletSlice);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchBalancesAsync = async () => {
      try {
        const response = await dispatch(fetchBalances(address as string));

        if (response.payload) {
          dispatch(balancesSliceActions.updateIsMatchNetwork(response.payload));
        }
      } catch (error) {
        console.error("Failed to fetch balances:", error);
      }
    };

    fetchBalancesAsync();
  }, [address]);

  return;
}
