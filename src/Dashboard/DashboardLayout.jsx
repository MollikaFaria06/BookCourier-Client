// src/dashboard/DashboardLayout.jsx
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} />

      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <main className="p-4 overflow-auto flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
