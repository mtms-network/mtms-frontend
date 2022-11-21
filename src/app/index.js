import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "configs";
import React from "react";
import {BrowserRouter, HashRouter} from "react-router-dom";
import Routers from "routes";
import { AppContextProvider } from "stores";
import { WalletProvider } from "react-binance-wallet";
import { MetaMaskProvider } from "metamask-react";

const App = () => {
  return (
    <HashRouter basename="/">
      <AppContextProvider>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <WalletProvider>
            <MetaMaskProvider>
              <Routers />
            </MetaMaskProvider>
          </WalletProvider>
        </GoogleOAuthProvider>
      </AppContextProvider>
    </HashRouter>
  );
};

export default App;
