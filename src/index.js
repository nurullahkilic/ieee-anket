import React from "react";
import ReactDOM from "react-dom/client";

import { UserProvider } from "./context/UserContext";

// eslint-disable-next-line
import "swiper/css/bundle";
import "./index.css";

import App from "./App.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
