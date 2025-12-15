// src/dashboard/DashboardHome.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const DashboardHome = () => {
  const { user } = useAuth(); // user should have a 'role' field: "user", "librarian", "admin"

  if (!user) return null;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Welcome, {user.name}!</h2>

      {/* User Dashboard */}
      {user.role === "user" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/dashboard/my-orders"
            className="bg-blue-600 text-white p-6 rounded shadow hover:bg-blue-700 text-center"
          >
            My Orders
          </Link>
          <Link
            to="/dashboard/invoices"
            className="bg-green-600 text-white p-6 rounded shadow hover:bg-green-700 text-center"
          >
            Invoices
          </Link>
          <Link
            to="/dashboard/my-profile"
            className="bg-purple-600 text-white p-6 rounded shadow hover:bg-purple-700 text-center"
          >
            My Profile
          </Link>
        </div>
      )}

      {/* Librarian Dashboard */}
      {user.role === "librarian" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/dashboard/librarian/add-book"
            className="bg-blue-600 text-white p-6 rounded shadow hover:bg-blue-700 text-center"
          >
            Add Book
          </Link>
          <Link
            to="/dashboard/librarian/my-books"
            className="bg-green-600 text-white p-6 rounded shadow hover:bg-green-700 text-center"
          >
            My Books
          </Link>
          <Link
            to="/dashboard/librarian/orders"
            className="bg-purple-600 text-white p-6 rounded shadow hover:bg-purple-700 text-center"
          >
            Orders
          </Link>
          <Link
            to="/dashboard/my-profile"
            className="bg-pink-600 text-white p-6 rounded shadow hover:bg-pink-700 text-center"
          >
            My Profile
          </Link>
        </div>
      )}

      {/* Admin Dashboard */}
      {user.role === "admin" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/dashboard/admin/all-users"
            className="bg-blue-600 text-white p-6 rounded shadow hover:bg-blue-700 text-center"
          >
            All Users
          </Link>
          <Link
            to="/dashboard/admin/manage-books"
            className="bg-green-600 text-white p-6 rounded shadow hover:bg-green-700 text-center"
          >
            Manage Books
          </Link>
          <Link
            to="/dashboard/my-profile"
            className="bg-purple-600 text-white p-6 rounded shadow hover:bg-purple-700 text-center"
          >
            My Profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
