// src/routes/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // If user is not logged in, redirect to login page
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default PrivateRoute;
