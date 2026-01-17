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
import About from "../pages/About";


// New imports for Blogs
import Blogs from "../components/home/Blogs";
import BlogDetail from "../pages/BlogDetail";

export default function AppRoutes() {
  const routes = [
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/books", element: <Books /> },
    { path: "/books/:id", element: <BookDetails /> },

    // Coverage route
    {
      path: "coverage",
      Component: Coverage,
      loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
    },

    // Dashboard
    {
      path: "/dashboard/*",
      element: (
        <PrivateRoute>
          <DashboardRoutes />
        </PrivateRoute>
      ),
    },

    // Auth
    { path: "/auth/login", element: <Login /> },
    { path: "/auth/register", element: <Register /> },

    // Payment
    { path: "/dashboard/user/payment/:id", element: <Payment /> },

    // Blogs
    { path: "/blogs", element: <Blogs /> },
    { path: "/blogs/:id", element: <BlogDetail /> },

    // 404 fallback
    { path: "*", element: <Navigate to="/" replace /> },
  ];

  return useRoutes(routes);
}
