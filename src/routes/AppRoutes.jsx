// src/routes/AppRoutes.jsx
import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Books from "../pages/AllBooks";
import Coverage from "../pages/Coverage"; 
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import BookDetails from "../pages/BookDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardRoutes from "./DashboardRoutes";
import Payment from "../dashboard/user/Payment";

export default function AppRoutes() {
  const routes = [
    { path: "/", element: <Home /> },
    { path: "/books", element: <Books /> },
    { path: "/books/:id", element: <BookDetails/> },
    {
      path: "coverage",
      Component: Coverage,
      loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
    },
    {
      path: "/dashboard/*",
      element: (
        <PrivateRoute>
          <DashboardRoutes />
        </PrivateRoute>
      ),
    },
    { path: "/auth/login", element: <Login /> },
    { path: "/auth/register", element: <Register /> },
    {path: "/dashboard/payment/:id" ,element:<Payment />},
    { path: "*", element: <Navigate to="/" replace /> },
  ];

  return useRoutes(routes);
}
