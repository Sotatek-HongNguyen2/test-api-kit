import React from "react";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import Routes from "./routes/routes";
// import { Web3ReactProvider } from "@web3-react/core";
import LayoutComponent from "./components/templates/layout";
import ToastContext from "./components/atoms/toast";
// import { appConnectors } from "./web3/connectors";

const App: React.FC = () => {
  return (
    // <Web3ReactProvider connectors={appConnectors}>
    <BrowserRouter basename="/">
      <LayoutComponent>
        <ToastContext />
        <Routes />
      </LayoutComponent>
    </BrowserRouter>
    // </Web3ReactProvider>
  );
};

export default App;
