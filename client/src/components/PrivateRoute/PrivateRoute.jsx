import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
  const { isAuthenticated, user } = useAuth0();

  const userRoles = user?.["https://your-namespace/roles"] || [];

  if (!isAuthenticated || !user || !userRoles.includes(role)) {
    return <Navigate to="/" />;
  }
  return children;
};

export default PrivateRoute;
