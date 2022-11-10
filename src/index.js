import React from "react";
import { createRoot } from "react-dom/client";
import "./i18n";
import App from "app";
import "./index.css";
import { Provider } from 'react-redux';
import { store } from "redux/store";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
    <Provider store={store}>

        <App />
    </Provider>
);
