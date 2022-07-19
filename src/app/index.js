import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "configs";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routers from "routes";
import { AppContextProvider } from "stores";

const App = () => {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <Routers />
        </GoogleOAuthProvider>
      </AppContextProvider>
    </BrowserRouter>
  );
};

export default App;
