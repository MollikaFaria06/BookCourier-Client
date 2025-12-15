import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../dashboard/DashboardLayout";
import RoleRoute from "./RoleRoute";

import DashboardHome from "../dashboard/DashboardHome";

// User
import MyOrders from "../dashboard/user/MyOrders";
import Invoices from "../dashboard/user/Invoices";
import MyProfile from "../dashboard/shared/MyProfile";

// Librarian
import AddBook from "../dashboard/librarian/AddBook";
import MyBooks from "../dashboard/librarian/MyBooks";
import EditBook from "../dashboard/librarian/EditBook";
import Orders from "../dashboard/librarian/Orders";

// Admin
import AllUsers from "../dashboard/admin/AllUsers";
import ManageBooks from "../dashboard/admin/ManageBooks";

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />

        {/* USER */}
        <Route
          path="my-orders"
          element={
            <RoleRoute allowedRoles={["user"]}>
              <MyOrders />
            </RoleRoute>
          }
        />
        <Route
          path="invoices"
          element={
            <RoleRoute allowedRoles={["user"]}>
              <Invoices />
            </RoleRoute>
          }
        />

        {/* COMMON */}
        <Route path="my-profile" element={<MyProfile />} />

        {/* LIBRARIAN */}
        <Route
          path="librarian/add-book"
          element={
            <RoleRoute allowedRoles={["librarian"]}>
              <AddBook />
            </RoleRoute>
          }
        />
        <Route
          path="librarian/my-books"
          element={
            <RoleRoute allowedRoles={["librarian"]}>
              <MyBooks />
            </RoleRoute>
          }
        />
        <Route
          path="librarian/edit-book/:id"
          element={
            <RoleRoute allowedRoles={["librarian"]}>
              <EditBook />
            </RoleRoute>
          }
        />
        <Route
          path="librarian/orders"
          element={
            <RoleRoute allowedRoles={["librarian"]}>
              <Orders />
            </RoleRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="admin/all-users"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <AllUsers />
            </RoleRoute>
          }
        />
        <Route
          path="admin/manage-books"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <ManageBooks />
            </RoleRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
