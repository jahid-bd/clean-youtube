import { StoreProvider, useStoreRehydrated } from "easy-peasy";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import store from "./store";
import "./styles/global.css";

function WaitForStateRehydration({ children }) {
  const isRehydrated = useStoreRehydrated();
  return isRehydrated ? children : null;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <StoreProvider store={store}>
    <Router>
      <WaitForStateRehydration>
        <Toaster />
        <App />
      </WaitForStateRehydration>
    </Router>
  </StoreProvider>
);
