import React, { Fragment, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

import { AppRoutes } from "./routes/routes";
import "@/assets/scss/_themes.scss";
import "@/assets/scss/variable.scss";
import useWeb3Injected from "./hooks/useWeb3Injected";
import useLoadWalletInstances from "./hooks/useLoadWalletInstances";
import ToastContext from "./components/atoms/ToastContext";
import useWalletEvents from "./hooks/useWalletEvents";
import useGetBalances from "./hooks/useGetBalances";
import useGetInformation from "./hooks/useGetInformation";
import { getAuthSlide, useAppSelector } from "./store";

const App: React.FC = () => {
  useWeb3Injected();
  useLoadWalletInstances();
  useWalletEvents();
  useGetBalances();

  const getInformation = useGetInformation();
  const { accessToken } = useAppSelector(getAuthSlide);

  useEffect(() => {
    if (accessToken) {
      const delayedGetInfo = () => {
        getInformation();
      };

      delayedGetInfo();

      return () => {};
    }
  }, [getInformation]);

  return (
    <Fragment>
      <ToastContext />
      <AppRoutes />
    </Fragment>
  );
};

export default App;
