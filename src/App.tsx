import React, { Fragment } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import { AppRoutes } from "./routes/routes";
import "@/assets/scss/_themes.scss";
import "@/assets/scss/variable.scss";
import useWeb3Injected from "./hooks/useWeb3Injected";
import useLoadWalletInstances from "./hooks/useLoadWalletInstances";
import ToastContext from "./components/atoms/ToastContext";

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
