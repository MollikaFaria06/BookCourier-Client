import React from "react";
import Sidebar from "../components/dashboard/Sidebar"; // adjust relative path if needed

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
    </div>
  );
}
