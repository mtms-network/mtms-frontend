import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routers from "routes";
import { AppContextProvider } from "stores";

const App = () => {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <Routers />
      </AppContextProvider>
    </BrowserRouter>
  );
};

export default App;
