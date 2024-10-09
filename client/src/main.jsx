import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-p41ki7qocbxnmh20.us.auth0.com"
      clientId="km4spGnGWYurDHkAh1BpC2NxoK4rHfOe"
      authorizationParams={{
        redirect_uri: "https://mtlrealty.vercel.app",
        audience: "http://api.realEstate.com",
      }}
      scope="openid profile email"
    >
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <App />
      </MantineProvider>
    </Auth0Provider>
  </React.StrictMode>
);
