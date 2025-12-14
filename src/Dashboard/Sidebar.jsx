// src/dashboard/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ collapsed }) => {
  const location = useLocation();

  const menuItems = [
    { name: "My Orders", path: "/dashboard/my-orders" },
    { name: "My Profile", path: "/dashboard/my-profile" },
    { name: "Invoices", path: "/dashboard/invoices" },
    // Add Librarian/Admin links dynamically based on role
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`bg-gray-800 text-white h-full p-4 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <h1 className={`text-xl font-bold mb-6 ${collapsed && "hidden"}`}>
        Dashboard
      </h1>
      <ul>
        {menuItems.map((item) => (
          <li key={item.path} className="mb-2">
            <Link
              to={item.path}
              className={`block whitespace-nowrap px-3 py-2 rounded hover:bg-gray-700 transition-colors
                ${isActive(item.path) ? "bg-gray-700 font-bold" : ""}`}
            >
              {collapsed ? item.name[0] : item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
