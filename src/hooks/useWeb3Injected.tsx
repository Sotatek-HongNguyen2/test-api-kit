import ITV from "@/constants/time";
import { getWalletObjSlice, useAppDispatch, useAppSelector } from "@/store";
import { walletObjSliceActions } from "@/store/slices/walletObjSlice";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

const maxIntervalPeriod = 5000;

export default function useWeb3Injected() {
  const dispatch = useAppDispatch();
  const { metamask } = useAppSelector(getWalletObjSlice);
  const interval = useRef<any>(null);
  const intervalPeriod = useRef<number>(0);
  //   Detecting web3 or ethereum injected
  useEffect(() => {
    console.log("run");

    interval.current = setInterval(() => {
      intervalPeriod.current += ITV.MS1;
      if (window.ethereum) {
        console.log(window.ethereum);
        dispatch(
          walletObjSliceActions.injectMetamask({
            ethereum: window.ethereum as any,
          })
        );
      }
      if (intervalPeriod.current === maxIntervalPeriod) {
        clearInterval(interval.current);
        interval.current = null;
      }
    }, ITV.MS1);
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  //   clearInterval if injected
  useEffect(() => {
    if (metamask.isInjected && interval.current)
      clearInterval(interval.current);
  }, [metamask.isInjected]);

  return;
}
