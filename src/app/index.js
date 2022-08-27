import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "configs";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routers from "routes";
import { AppContextProvider } from "stores";
import { WalletProvider } from "react-binance-wallet";
import { MetaMaskProvider } from "metamask-react";

const App = () => {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <WalletProvider>
            <MetaMaskProvider>
              <Routers />
            </MetaMaskProvider>
          </WalletProvider>
        </GoogleOAuthProvider>
      </AppContextProvider>
    </BrowserRouter>
  );
};

export default App;
