import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routers from "routes";
import { AppStore } from "stores";

const App = () => {
  return (
    <BrowserRouter>
      <AppStore.Provider>
        <Routers />
      </AppStore.Provider>
    </BrowserRouter>
  );
};

export default App;
