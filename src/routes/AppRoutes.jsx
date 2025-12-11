// src/routes/AppRoutes.jsx
import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Books from "../pages/AllBooks";
import Coverage from "../pages/Coverage"; // <- import here
import Dashboard from "../Dashboard/DashboardLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

export default function AppRoutes() {
  const routes = [
    { path: "/", element: <Home /> },
    { path: "/books", element: <Books /> },
    
    {
                path: 'coverage',
                Component: Coverage,
                loader: () => fetch('/serviceCenter.json')
                .then(res => res.json())
            }, // <- route added
    { path: "/dashboard/*", element: <Dashboard /> },
    { path: "/auth/login", element: <Login /> },
    { path: "/auth/register", element: <Register /> },
    { path: "*", element: <Navigate to="/" replace /> },
  ];

  return useRoutes(routes);
}
