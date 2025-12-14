import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../dashboard/DashboardLayout";

// User Pages
import MyOrders from "../dashboard/user/MyOrders";
import Invoices from "../dashboard/user/Invoices";
import MyProfile from "../dashboard/shared/MyProfile";

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        {/* User Pages */}
        <Route index element={<MyOrders />} /> {/* Default page */}
        <Route path="my-orders" element={<MyOrders />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="my-profile" element={<MyProfile />} />
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
