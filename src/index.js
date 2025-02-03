import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App/App";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
