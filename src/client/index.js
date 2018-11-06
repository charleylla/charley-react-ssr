import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { getClientStore } from "@core/store";

import App from "./App";
ReactDOM.hydrate((
  <Provider store={getClientStore()}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
),document.querySelector("#root"));
