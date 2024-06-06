import React, { Fragment } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
// import { Web3ReactProvider } from "@web3-react/core";
import ToastContext from "./components/atoms/toast";
import { AppRoutes } from "./routes/routes";
// import { appConnectors } from "./web3/connectors";

const App: React.FC = () => {
  return (
    // <Web3ReactProvider connectors={appConnectors}>
    <Fragment>
        <ToastContext />
        <AppRoutes />
    </Fragment>
    // </Web3ReactProvider>
  );
};

export default App;
