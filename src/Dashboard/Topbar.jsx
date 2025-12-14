// src/dashboard/Topbar.jsx
import React from "react";

const Topbar = ({ toggleSidebar }) => {
  return (
    <div className="bg-white shadow flex items-center justify-between p-4">
      <button
        onClick={toggleSidebar}
        className="text-gray-800 font-bold focus:outline-none"
      >
        ☰
      </button>
      <h2 className="text-lg text-black font-semibold">Dashboard</h2>
      <div className="text-black">User Menu</div>
    </div>
  );
};

export default Topbar;
