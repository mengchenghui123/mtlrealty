import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-htkjk3aua38i5rux.us.auth0.com"
      clientId="nVKAdz4m3HZ9Q3ubiGorXDCerMMfUZoa"
      authorizationParams={{
        redirect_uri: "http://localhost:5173",
        audience: "https://api.realEstate.com",
      }}
      scope="openid profile email"
    >
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <App />
      </MantineProvider>
    </Auth0Provider>
  </React.StrictMode>
);
