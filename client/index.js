
import React from "react";
import ReactDom from "react-dom";
import { App } from "./App";
import store from "./src/app/store.js";
import { Provider } from "react-redux";

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);

