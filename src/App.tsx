import React, { Fragment } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import ToastContext from "./components/atoms/toast";
import { AppRoutes } from "./routes/routes";

import { Provider } from "react-redux";
import useWeb3Injected from "./hooks/useWeb3Injected";
import useLoadWalletInstances from "./hooks/useLoadWalletInstances";

const App: React.FC = () => {
  useWeb3Injected();
  useLoadWalletInstances();
  return (
    <Fragment>
      <ToastContext />
      <AppRoutes />
    </Fragment>
  );
};

export default App;
